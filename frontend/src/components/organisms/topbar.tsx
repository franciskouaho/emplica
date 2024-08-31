'use client'

import {useState} from "react";

const TopBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header
            className="h-16 bg-mainAccent flex items-center justify-between px-6 rounded-lg shadow-md text-white border-4 border-solid border-black">
            <div className="text-xl font-semibold">Welcome back!</div>

            <div className="flex justify-between items-center space-x-4">
                <button
                    className="border-black border-2 rounded-full bg-white w-10 h-10 text-black">
                    <p className="text-sm">200</p>
                </button>

                <div className="relative inline-block text-left text-black">
                    <div>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-x-1.5"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() => setOpen(!open)}
                        >
                            <span className="bg-gray-400 h-10 w-10 rounded-full"></span>
                        </button>
                    </div>

                    <div
                        className={`${
                            open ? '' : 'hidden'
                        } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div role="none">
                            <div
                                className="block  px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium">
                                <p className="text-black font-black">
                                    Francis KOUAHO
                                </p>
                                <p className="text-gray-400">
                                    kouaho@gmail.com
                                </p>
                            </div>

                            <a
                                href=""
                                className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
                                role="menuitem"
                                id="menu-item-0"
                            >
                                Account settings
                            </a>
                            <a
                                href=""
                                className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
                                role="menuitem"
                                id="menu-item-1"
                            >
                                Support
                            </a>
                            <form method="POST" action="#" role="none">
                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-[#B8FF9F] hover:font-medium"
                                    role="menuitem"
                                    id="menu-item-3"
                                >
                                    Se déconnecter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
