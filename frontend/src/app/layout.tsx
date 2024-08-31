'use client'

import './globals.css'
import {ThemeProvider} from '@/provider/theme-provider'
import {useState} from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
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
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
        </body>
        </html>
    )
}
