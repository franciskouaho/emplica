'use client'

import {useState} from 'react';
import Link from "next/link";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');

    return (
        <div className="flex w-full justify-center fixed top-3 z-50">
            <div className="max-w-[70rem] w-full">
                <div className="rounded-2xl flex justify-center items-center h-16 bg-mainAccentGray border border-solid border-black px-4 py-2 shadow-xl">
                    <div className="flex justify-between items-center w-full">
                        <div className="text-2xl font-bold">Logo</div>
                        <div className="flex items-center gap-4 text-sm">
                            {['Features', 'Pricing', 'Use cases'].map((link) => (
                                <Link
                                    key={link}
                                    href="#"
                                    className={`text-sm ${activeLink === link ? 'border-b-2 border-mainAccent font-bold' : ''}`}
                                    onClick={() => setActiveLink(link)}
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                className="bg-white h-9 px-3 dark:bg-darkBg dark:text-darkText border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX flex justify-between items-center hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
                                href="/auth/login">
                                Log in
                            </Link>
                            <Link
                                className="h-9 px-3 text-sm bg-main border-2 text-white flex justify-center items-center border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
                                href="/auth/signup">
                                Sign up for free
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
