"use server";

import { cookies } from "next/headers";

export async function loginAdmin(password: string) {
  const secretPassword = process.env.ADMIN_PASSWORD;

  if (!secretPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set!");
    return { success: false, error: "Configuration de sécurité manquante" };
  }

  if (password === secretPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      path: "/",
      maxAge: 86400, // 24 heures
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return { success: true };
  }

  return { success: false, error: "Mot de passe incorrect" };
}
