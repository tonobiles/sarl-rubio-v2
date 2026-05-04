import { NextResponse } from 'next/server';

const CPV_FILTERS = [
  '45330', // Plomberie
  '45331', // Chauffage/Clim
  '45332', // Sanitaire
  '50720', // Entretien
  '42511'  // PAC
];

const DEPT_FILTERS = ['84', '13', '30', '26', '05'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '20';
  const page = searchParams.get('page') || '1';
  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Construction du filtre WHERE
  const cpvWhere = CPV_FILTERS.map(c => `cpv like "${c}%"`).join(' OR ');
  const deptWhere = DEPT_FILTERS.map(d => `departement="${d}"`).join(' OR ');
  const where = `(${cpvWhere}) AND (${deptWhere})`;

  const url = new URL('https://www.boamp.fr/api/explore/v2.1/catalog/datasets/boamp/records');
  url.searchParams.set('where', where);
  url.searchParams.set('limit', limit);
  url.searchParams.set('offset', offset.toString());
  url.searchParams.set('order_by', 'dateparution DESC');
  url.searchParams.set('select', 'id,objet,acheteur,datelimitereponse,dateparution,cpv,urlboamp,montant,procedures,departement');

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache d'une heure
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`BOAMP API error: ${response.status}`);
    }

    const data = await response.json();

    // Normalisation des données
    const records = (data.results || []).map((r: any) => ({
      id: r.id,
      source: 'BOAMP',
      objet: r.objet || 'Sans objet',
      acheteur: r.acheteur?.nom || r.acheteur || 'N/C',
      departement: r.departement || 'N/C',
      datePublication: r.dateparution,
      dateLimite: r.datelimitereponse,
      cpv: r.cpv,
      montant: r.montant || null,
      procedure: r.procedures || null,
      url: r.urlboamp || `https://www.boamp.fr/avis/detail/${r.id}`,
    }));

    return NextResponse.json({
      total: data.total_count || records.length,
      page: parseInt(page),
      limit: parseInt(limit),
      records,
    });

  } catch (error: any) {
    console.error('BOAMP fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
