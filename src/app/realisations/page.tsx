import { getProjects } from "@/app/actions/projects";
import RealisationsClient from "@/components/RealisationsClient";

export const dynamic = 'force-dynamic';

export default async function RealisationsPage() {
  const projects = await getProjects();
  
  return <RealisationsClient projects={projects} />;
}
