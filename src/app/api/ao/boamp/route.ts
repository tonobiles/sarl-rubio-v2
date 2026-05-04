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

  // Filtres géographiques (Vaucluse + limitrophes)
  const depts = "('84','13','30','26','05')";
  const keywords = "('plomberie','chauffage','climatisation','pompe à chaleur','sanitaire','vmc')";
  
  // On utilise une recherche plein texte croisée avec le département
  const where = `code_departement in ${depts}`;
  const searchKeywords = 'plomberie OR chauffage OR climatisation OR "pompe à chaleur" OR sanitaire OR vmc';

  const url = new URL('https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records');
  url.searchParams.set('where', where);
  url.searchParams.set('search', searchKeywords);
  url.searchParams.set('limit', limit);
  url.searchParams.set('order_by', 'dateparution DESC');
  
  console.log('Fetching BOAMP Final Version...');

  try {
    const response = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`BOAMP API error: ${response.status}`);
    }

    const data = await response.json();

    // Normalisation des données avec mapping profond
    const records = (data.results || []).map((r: any) => ({
      id: r.id,
      source: 'BOAMP',
      objet: r.objet || 'Sans objet',
      acheteur: r.acheteur?.nom || r.nom_acheteur || r.acheteur || 'Acheteur Public',
      departement: r.code_departement || r.departement || '84',
      datePublication: r.dateparution,
      dateLimite: r.datelimitereponse,
      dateFinDiffusion: r.datefindiffusion || null,
      cpv: r.cpv || (r.donnees?.cpv?.[0]?.code) || null,
      montant: r.montant || null,
      procedure: r.type_procedure || r.procedures || null,
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
