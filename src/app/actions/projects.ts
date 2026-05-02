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

import { put } from "@vercel/blob";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const imageFile = formData.get("image") as File;

  try {
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      const blob = await put(imageFile.name, imageFile, {
        access: 'public',
      });
      imageUrl = blob.url;
    }

    await prisma.project.create({
      data: {
        title,
        category,
        image: imageUrl,
        description: location,
      }
    });
    revalidatePath("/realisations");
    revalidatePath("/admin/dashboard/realisations");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Erreur lors de la création ou de l'upload" };
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
