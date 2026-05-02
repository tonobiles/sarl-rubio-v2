import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function PlomberiePage() {
  return (
    <ServicePageTemplate
      title="PLOMBERIE SANITAIRE"
      subtitle="Expertise et réactivité pour tous vos travaux de plomberie dans le Vaucluse."
      image="/images/plomberie.png"
      description="SARL RUBIO intervient pour la pose et la réparation de tous vos systèmes de plomberie à Entraigues-sur-la-Sorgue et ses alentours. Qu'il s'agisse d'installations neuves, de rénovations ou de dépannages urgents, nous garantissons un travail soigné respectant les normes de sécurité en vigueur."
      features={[
        "Dépannage urgent sous 24h",
        "Installation & Rénovation",
        "Entretien annuel",
        "Devis gratuit et détaillé"
      ]}
      prestations={[
        {
          title: "Installation & Rénovation",
          items: [
            "Pose de robinetterie (mitigeurs, mélangeurs)",
            "Installation de douches, baignoires et vasques",
            "Rénovation complète de salles de bain",
            "Mise aux normes des canalisations"
          ]
        },
        {
          title: "Équipements & Dépannage",
          items: [
            "Remplacement de ballons d'eau chaude",
            "Réparation de fuites et débouchage",
            "Pose de WC suspendus ou classiques",
            "Raccordement d'appareils électroménagers"
          ]
        }
      ]}
    />
  );
}
