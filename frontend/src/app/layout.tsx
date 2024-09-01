'use client'

import './globals.css'
import {ThemeProvider} from '@/provider/theme-provider'
import {ReactNode, useState} from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "@/components/ui/toaster";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode
}>) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                        staleTime: 0,
                    },
                },
            }),
    )
    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                {children}
                {/*<ThemeSwitcher />*/}
                <Toaster/>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
        </body>
        </html>
    )
}
