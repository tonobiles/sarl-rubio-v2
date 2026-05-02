import { getPartners } from "@/app/actions/partners";
import PartnersClient from "@/components/PartnersClient";

export const dynamic = 'force-dynamic';

export default async function EquipePage() {
  const partners = await getPartners();
  
  return <PartnersClient partners={partners} />;
}
