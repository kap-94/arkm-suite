// app/dashboard/project/[id]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "../mockData";
import { ProjectDetails } from "./ProjectClient";

interface PageProps {
  params: {
    id: string;
  };
}

async function getProjectById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return projects.find((p) => p.id === id) || null;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetails initialProject={project} />;
}
