"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPartners() {
  try {
    return await prisma.partner.findMany({
      orderBy: { order: 'asc' }
    });
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return [];
  }
}

export async function createPartner(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const logo = formData.get("logo") as string;
  const order = parseInt(formData.get("order") as string || "0");

  try {
    await prisma.partner.create({
      data: {
        name,
        type,
        logo,
        order,
      }
    });
    revalidatePath("/equipe");
    revalidatePath("/admin/dashboard/partners");
    return { success: true };
  } catch (error) {
    console.error("Failed to create partner:", error);
    return { success: false, error: "Erreur lors de la création" };
  }
}

export async function deletePartner(id: string) {
  try {
    await prisma.partner.delete({
      where: { id }
    });
    revalidatePath("/equipe");
    revalidatePath("/admin/dashboard/partners");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete partner:", error);
    return { success: false, error: "Erreur lors de la suppression" };
  }
}
