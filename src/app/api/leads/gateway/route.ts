import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message, subject } = data;

    // Sauvegarde avec le tag [EGELEC] pour la centralisation
    const lead = await prisma.lead.create({
      data: {
        name,
        email: email || "non@specifie.fr",
        phone,
        subject: `[EGELEC] ${subject || "Demande de contact"}`,
        message,
        status: "NEU"
      }
    });

    console.log("External lead received from EGELEC:", lead.id);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Gateway Lead Error:", error);
    return NextResponse.json({ error: "Failed to receive lead" }, { status: 500 });
  }
}
