import PricingPlan from '@/components/organisms/pricing-plan'

export default function Pricing() {
    return (
        <section
            className="border-b-border dark:border-b-darkBorder dark:bg-darkBg inset-0 flex w-full flex-col items-center justify-center border-b-2 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
            <div className="mx-auto w-container max-w-full px-5 py-20 lg:py-[100px]">
                <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
                    Nos Plans d'Abonnement
                </h2>
                <div className="grid grid-cols-3 gap-8 w900:mx-auto w900:w-2/3 w900:grid-cols-1 w500:w-full">
                    <PricingPlan
                        planName="Gratuit 50 crédits"
                        description=" Pour ceux qui postulent régulièrement."
                        perks={[
                            '1 crédit = 1 candidature envoyée',
                            '10 crédits = Accès à des statistiques avancées',
                            '20 crédits = Automatisation des candidatures',
                            '50 crédits = Rapports personnalisés et notifications avancées',
                            'Support prioritaire sous 24 heures',
                        ]}
                        mostPopular
                    />
                </div>
            </div>
        </section>
    )
}
