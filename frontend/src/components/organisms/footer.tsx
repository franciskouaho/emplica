'use client'

import {useEffect, useState} from 'react';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="m500:text-sm dark:bg-darkBg text-sm z-30 bg-white px-5 py-5 text-center font-base">
            © All rights reserved || {year} || Made with ❤️ jobpilot
        </footer>
    );
}

export default Footer;
