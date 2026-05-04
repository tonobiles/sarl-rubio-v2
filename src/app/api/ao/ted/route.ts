import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';

  const body = {
    query: "plomberie OR chauffage OR climatisation OR VMC OR \"pompe à chaleur\"",
    filters: {
      cpvCodes: ["45330000","45331000","45331100","45331200","45331220","45332000","50720000"],
      countryCodes: ["FR"],
      nutsCode: ["FRL04", "FRL0", "FRL"] // Région PACA et départements
    },
    fields: ["title","publicationDate","deadlineDate","buyerName","contractValue","noticeUrl","cpvs"],
    page: parseInt(page),
    pageSize: parseInt(limit),
    sortBy: "publicationDate",
    sortOrder: "desc"
  };

  try {
    const response = await fetch('https://api.ted.europa.eu/v3/notices/search', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify(body),
      next: { revalidate: 7200 } // Cache de 2 heures pour TED (marchés plus longs)
    });

    if (!response.ok) throw new Error(`TED API error: ${response.status}`);

    const data = await response.json();

    const records = (data.notices || []).map((n: any) => ({
      id: n.id || n.publicationNumber,
      source: 'TED',
      objet: n.title?.fr || n.title?.en || 'Sans titre',
      acheteur: n.buyerName || 'N/C',
      departement: 'UE / National',
      datePublication: n.publicationDate,
      dateLimite: n.deadlineDate,
      cpv: n.cpvs?.[0]?.code,
      montant: n.contractValue?.amount || null,
      procedure: null,
      url: n.noticeUrl || `https://ted.europa.eu/en/notice/${n.id}`,
    }));

    return NextResponse.json({
      total: data.total || records.length,
      page: parseInt(page),
      limit: parseInt(limit),
      records,
    });

  } catch (error: any) {
    console.error('TED fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
