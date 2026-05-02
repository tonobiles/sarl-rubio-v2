"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string; // URL de l'image (sera géré par upload plus tard)
  const description = formData.get("location") as string;

  try {
    await prisma.project.create({
      data: {
        title,
        category,
        image,
        description,
      }
    });
    revalidatePath("/realisations");
    revalidatePath("/admin/dashboard/realisations");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Erreur lors de la création" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    });
    revalidatePath("/realisations");
    revalidatePath("/admin/dashboard/realisations");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Erreur lors de la suppression" };
  }
}
