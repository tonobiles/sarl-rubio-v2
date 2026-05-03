import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // Projects
  const projects = [
    { title: "Climatisation Cabinet Médical", category: "Climatisation", images: ["/images/realisations/Sans-titre1.jpg"], description: "Vaucluse" },
    { title: "Climatisation Tertiaire", category: "Climatisation", images: ["/images/realisations/Sans-titre2.jpg"], description: "Vaucluse" },
    { title: "Ballon ECS & Plancher Chauffant", category: "Chauffage", images: ["/images/realisations/Sans-titre3.jpg"], description: "Entraigues" },
    { title: "Installation Eau Chaude Sanitaire", category: "Chauffage", images: ["/images/realisations/Sans-titre4.jpg"], description: "Entraigues" },
    { title: "Pose VMC — Bâtiment Neuf", category: "Climatisation", images: ["/images/realisations/Sans-titre5.jpg"], description: "Vaucluse" },
    { title: "Réseau VMC en Cours", category: "Climatisation", images: ["/images/realisations/Sans-titre6.jpg"], description: "Vaucluse" },
    { title: "Ventilation Tertiaire", category: "Climatisation", images: ["/images/realisations/Sans-titre7.jpg"], description: "Vaucluse" },
    { title: "Gaines de Distribution", category: "Climatisation", images: ["/images/realisations/Sans-titre8.jpg"], description: "Vaucluse" },
    { title: "Diffusion d'Air Tertiaire", category: "Climatisation", images: ["/images/realisations/Sans-titre9.jpg"], description: "Vaucluse" },
    { title: "VMC Bâtiment Industriel", category: "Climatisation", images: ["/images/realisations/Sans-titre10.jpg"], description: "Vaucluse" },
    { title: "Installation VMC Neuf", category: "Climatisation", images: ["/images/realisations/Sans-titre11.jpg"], description: "Vaucluse" },
    { title: "Climatisation Entrepôt", category: "Climatisation", images: ["/images/realisations/Sans-titre12.jpg"], description: "Vaucluse" },
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }

  // Partners
  const partners = [
    { name: "Richardson", logo: "/images/partners/partner4.jpg", type: "Distributeur", order: 1 },
    { name: "Prolians", logo: "/images/partners/partner3.png", type: "Distributeur", order: 2 },
    { name: "Andrety", logo: "/images/partners/partner5.png", type: "Distributeur", order: 3 },
    { name: "Grand Delta Habitat", logo: "/images/partners/grand-delta.png", type: "Distributeur", order: 4 },
    { name: "Nos marques chauffage & plomberie", logo: "/images/partners/partner1.png", type: "Marque", order: 5 },
    { name: "Nos marques sanitaires", logo: "/images/partners/partner2.png", type: "Marque", order: 6 },
  ]

  for (const p of partners) {
    await prisma.partner.create({ data: p })
  }

  // Testimonials
  const testimonials = [
    { 
      name: "Client Barbentane (13)", 
      content: "Entreprise à l’écoute du client ; toujours à la recherche du meilleur rapport qualité prix ; respect des engagements en terme de délai et de qualité de travail ; à recommander sans hésitation.",
      location: "Barbentane",
      rating: 5
    },
    { 
      name: "Client Châteurenard (13)", 
      content: "Sympa, prix corrects et très pro, je recommande vivement pour tous vos travaux.",
      location: "Châteurenard",
      rating: 5
    },
    { 
      name: "Client Graveson (13)", 
      content: "Un artisan réactif, qui nous a fait un travail propre et soigné. Très satisfait de son intervention.",
      location: "Graveson",
      rating: 5
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
