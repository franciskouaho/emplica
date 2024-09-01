export default function Community() {
    const reviews = [
        {
            jobTitle: "Ingénieure Logiciel",
            pfp: "https://via.placeholder.com/150",
            fullName: "Marie Dupont",
            review: "Grâce à cette plateforme, j'ai pu trouver un poste d'ingénieure logiciel qui correspondait parfaitement à mes compétences en développement. Le processus de matching était extrêmement précis et m'a permis de décrocher plusieurs entretiens en très peu de temps. Je recommande vivement cette plateforme à tous ceux qui cherchent un emploi dans la tech."
        },
        {
            jobTitle: "Responsable Marketing",
            pfp: "https://via.placeholder.com/150",
            fullName: "Jean Martin",
            review: "En tant que professionnel du marketing, j'avais besoin d'une plateforme qui comprenne mes compétences et mes aspirations. J'ai été impressionné par la rapidité avec laquelle j'ai pu trouver un emploi qui correspondait à mes attentes. De plus, le support client était toujours disponible pour répondre à mes questions. Un excellent outil pour les chercheurs d'emploi !"
        },
        {
            jobTitle: "Assistante de Direction",
            pfp: "https://via.placeholder.com/150",
            fullName: "Sophie Leclerc",
            review: "Je cherchais un poste d'assistante de direction dans un environnement dynamique. Grâce à cette plateforme, j'ai non seulement trouvé un emploi rapidement, mais j'ai aussi pu postuler à des offres qui correspondaient exactement à mes critères. Le tableau de bord est très intuitif et m'a permis de suivre mes candidatures en temps réel."
        },
        {
            jobTitle: "Chef de Projet",
            pfp: "https://via.placeholder.com/150",
            fullName: "Marc Lemoine",
            review: "Après plusieurs années dans le secteur de la construction, je cherchais à relever de nouveaux défis en tant que chef de projet. La plateforme m'a permis de filtrer les offres d'emploi en fonction de mon expérience et de mes compétences. J'ai pu trouver une entreprise qui partage mes valeurs et où je me sens parfaitement à ma place."
        },
        {
            jobTitle: "Analyste Financier",
            pfp: "https://via.placeholder.com/150",
            fullName: "Pierre Lefèvre",
            review: "La plateforme m'a aidé à cibler les offres qui correspondaient exactement à mon profil. J'ai pu utiliser les crédits de manière efficace pour postuler uniquement aux postes les plus pertinents. En moins d'un mois, j'ai trouvé un poste qui correspond parfaitement à mes compétences et à mes ambitions."
        },
        {
            jobTitle: "Chef de Projet Digital",
            pfp: "https://via.placeholder.com/150",
            fullName: "Clara Moreau",
            review: "'ai apprécié la flexibilité offerte par le système de crédits. Cela m'a permis de gérer mon budget tout en maximisant mes chances de trouver le bon emploi. Le générateur d'emails est également un outil formidable qui m'a fait gagner beaucoup de temps. Grâce à cette plateforme, j'ai décroché l'emploi que je recherchais."
        }
    ];

    return (
        <section className="border-b-border text-white dark:border-b-darkBorder dark:bg-darkBg inset-0 flex w-full flex-col items-center justify-center border-b-2 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
            <div className="mx-auto w-container max-w-full px-5 py-20 lg:py-[100px]">
                <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
                    Avis utilisateurs
                </h2>
                <div className="grid grid-cols-3 gap-4 lg:gap-8 w900:grid-cols-1 w900:gap-0">
                    {reviews.map(({ jobTitle, pfp, fullName, review }, index) => (
                        <div
                            className="border-border dark:border-darkBorder shadow-light dark:shadow-dark dark:bg-darkBg mb-4 min-h-48 w-full rounded-base border-2 bg-bg p-5 lg:mb-8 w900:mx-auto w900:min-h-20 w900:w-2/3 w500:w-full"
                            key={index}
                        >
                            <div className="flex items-center gap-5">
                                <img
                                    className="border-border dark:border-darkBorder h-12 w-12 rounded-base border-2"
                                    src={pfp}
                                    alt="pfp"
                                />
                                <div>
                                    <h4 className="text-lg font-heading">{fullName}</h4>
                                    <p className="text-sm font-base">{jobTitle}</p>
                                </div>
                            </div>
                            <div className="mt-5">{review}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
