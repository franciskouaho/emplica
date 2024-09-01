'use client'

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FormEvent} from "react";
import {useMutation} from "@tanstack/react-query";
import api from "@/config/api";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

const Signup = () => {
    const router = useRouter();

    const handleMutationSignup = useMutation({
        mutationFn: (data: { [key: string]: string }) => api.post('signup', data),
        onSuccess: () => {
            toast({
                title: "Signup Success",
            });
            router.push('/auth/login');
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: "Signup Failed",
            });
        }
    });

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries()) as { [key: string]: string };

        handleMutationSignup.mutate(values);
    }

    return (
        <div
            className="flex justify-center items-center h-screen w-screen dark:bg-darkBg inset-0 min-h-[80dvh] flex-col bg-[#f2f4f7] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-lg">
                <h4 className="font-extrabold text-2xl mt-5">Bienvenue à nouveau !</h4>
                <form className="w-[480px]" onSubmit={handlerSubmit}>
                    <div className="flex flex-col items-start my-5 w-full">
                        <label htmlFor="username" className="font-semibold mb-1">Nom complet</label>
                        <input type="text"
                               className="w-full outline-none border-2 border-black shadow-md p-3 rounded-md text-base focus:translate-y-1 focus:shadow-sm"
                               id="username" name="username" placeholder="Enter your full name"/>
                    </div>
                    <div className="flex flex-col items-start my-5 w-full">
                        <label htmlFor="email" className="font-semibold mb-1">Email</label>
                        <input type="email"
                               className="w-full outline-none border-2 border-black shadow-md p-3 rounded-md text-base focus:translate-y-1 focus:shadow-sm"
                               id="email" name="email" placeholder="Enter your email"/>
                    </div>
                    <div className="flex flex-col items-start my-5 w-full">
                        <label htmlFor="password" className="font-semibold mb-1">Password</label>
                        <input type="password"
                               className="w-full outline-none border-2 border-black shadow-md p-3 rounded-md text-base focus:translate-y-1 focus:shadow-sm"
                               id="password" name="password" placeholder="Enter your password"/>
                    </div>
                    <div>
                        <Button size="lg" className="w-full" type="submit">
                            Créer un compte
                        </Button>
                        <p className="my-5 flex justify-center items-center text-sm">Vous avez déjà un compte ? <Link
                            href="/auth/login"
                            className="ml-1 font-extrabold">
                            Se connecter
                        </Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
