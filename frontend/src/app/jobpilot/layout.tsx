'use client'

import TopBar from "@/components/organisms/topbar";
import {FunctionComponent, ReactNode} from "react";
import Sidebar from "@/components/organisms/sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({children}) => {

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen bg-gradient-to-r from-gray-200 to-gray-100 p-2">
            <Sidebar/>
            <div className="flex-1 flex flex-col px-1.5 gap-2">
                <TopBar/>
                <main
                    className="flex-1 px-2 bg-mainAccentGray rounded-lg shadow-md border-4 border-solid border-black">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
