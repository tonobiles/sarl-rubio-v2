import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function ChauffagePage() {
  return (
    <ServicePageTemplate
      title="CHAUFFAGE ÉNERGIE"
      subtitle="Optimisez votre confort thermique et vos économies d'énergie avec nos solutions certifiées RGE."
      image="/images/chauffage.png"
      description="Nous installons, remplaçons et entretenons vos systèmes de chauffage avec une expertise reconnue. Spécialiste de la Pompe à Chaleur (PAC) et des chaudières à haute performance, SARL RUBIO vous accompagne dans la transition énergétique de votre habitat pour plus de confort et moins de dépenses."
      accentColor="primary"
      features={[
        "Certification RGE QualiPAC",
        "Économies d'énergie",
        "Aides de l'État (MaPrimeRénov')",
        "Suivi et maintenance"
      ]}
      prestations={[
        {
          title: "Pompes à Chaleur (PAC)",
          items: [
            "Installation de PAC Air-Air (Climatisation réversible)",
            "Pose de PAC Air-Eau pour chauffage central",
            "Mise en service et réglages optimisés",
            "Conseil sur le dimensionnement thermique"
          ]
        },
        {
          title: "Chaudières & Radiateurs",
          items: [
            "Installation de chaudières Gaz à condensation",
            "Remplacement de radiateurs et planchers chauffants",
            "Désembouage de circuits de chauffage",
            "Contrat d'entretien annuel obligatoire"
          ]
        }
      ]}
    />
  );
}
