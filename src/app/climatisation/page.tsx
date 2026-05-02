import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function ClimatisationPage() {
  return (
    <ServicePageTemplate
      title="CLIMATISATION CONFORT"
      subtitle="Restez au frais tout l'été avec nos installations de climatisation silencieuses et performantes."
      image="/images/clim.png"
      description="SARL RUBIO propose des solutions de climatisation adaptées aux particuliers comme aux professionnels (pharmacies, banques, administrations). Grâce à notre capacité de manipulation des fluides frigorigènes, nous assurons une installation conforme, durable et optimisée pour votre espace."
      features={[
        "Étude technique & Audit",
        "Manipulation fluides certifiée",
        "Solutions Tertiaire & Santé",
        "Maintenance & Réparation"
      ]}
      prestations={[
        {
          title: "Particuliers & Résidentiel",
          items: [
            "Pose de climatisations Mono-Split et Multi-Split",
            "Unités murales esthétiques et silencieuses",
            "Climatisation réversible (Chauffage en hiver)",
            "Maintenance préventive des filtres"
          ]
        },
        {
          title: "Professionnels & Tertiaire",
          items: [
            "Systèmes de climatisation pour pharmacies et cliniques",
            "Installation pour bureaux et administrations",
            "Contrats de maintenance pro",
            "Intervention rapide en cas de panne"
          ]
        }
      ]}
    />
  );
}
