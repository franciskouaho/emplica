import {Button} from '@/components/ui/button'

export default function Header() {
    return (
        <header
            className="dark:bg-darkBg inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-[#f2f4f7] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
                <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
                    Trouvez les offres qui matchent avec vos profils en un clin d’œil
                </h1>
                <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
                    Accédez à une multitude d'offres à votre profil en quelques clics.
                    <br/>
                    <span
                        className="font-heading underline"
                    >
                        Découvrez comment notre plateforme peut vous aider à décrocher le job de vos rêves.
                    </span>{' '}
                </p>
                <Button
                    size="lg"
                    className="h-12 text-base text-white font-heading md:text-lg lg:h-14 lg:text-xl"
                >
                    Inscrivez-vous gratuitement
                </Button>
            </div>
        </header>
    )
}
