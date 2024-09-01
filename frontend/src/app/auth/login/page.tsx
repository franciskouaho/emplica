'use client'

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FormEvent} from "react";
import {useMutation} from "@tanstack/react-query";
import api from "@/config/api";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

const Login = () => {
    const router = useRouter()

    const handleMutationLogin = useMutation({
        mutationFn: (data: { [key: string]: string }) => api.post('token', {
            email: data.email,
            password: data.password,
        }),
        onSuccess: () => {
            toast({
                title: "Login Success",
            });

            router.push('/jobpilot');
        },
        onError: (error: any) => {
            if (error.response?.data?.detail) {
                error.response.data.detail.forEach((err: any) => {
                    toast({
                        variant: 'destructive',
                        title: "Login Failed",
                        description: `${err.loc[1]}: ${err.msg}`,
                    });
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: "Login Failed",
                });
            }
            router.push('/auth/login');
        }
    });

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const values = Object.fromEntries(formData.entries()) as { [key: string]: string }

        handleMutationLogin.mutate(values)
    }

    return (
        <div
            className="flex justify-center items-center h-screen w-screen dark:bg-darkBg inset-0 min-h-[80dvh] flex-col bg-[#f2f4f7] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-lg">
                <h4 className="font-extrabold text-2xl mt-5">Bienvenue à nouveau !</h4>
                <form className="w-[480px]" onSubmit={handlerSubmit}>
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
                        <Button size="lg" className="w-full" type="submit">Se connecter</Button>
                        <p className="my-5 flex justify-center items-center text-sm">Pas encore de compte ? <Link
                            href="/auth/signup" className="ml-1 font-extrabold">S'inscrire</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
