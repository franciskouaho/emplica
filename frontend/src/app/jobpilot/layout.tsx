'use client'

import TopBar from "@/components/organisms/topbar";
import {FunctionComponent, ReactNode} from "react";
import Sidebar from "@/components/organisms/sidebar";
import {AuthProvider} from "@/context/AuthContext";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({children}) => {

    return (
        <AuthProvider>
            <div className="flex h-screen w-screen bg-gradient-to-r from-gray-200 to-gray-100 p-4">
                <Sidebar/>
                <div className="flex-1 flex flex-col px-3 gap-2">
                    <TopBar/>
                    <main
                        className="flex-1 p-6 bg-mainAccentGray rounded-lg shadow-md border-4 border-solid border-black">
                        {children}
                    </main>
                </div>
            </div>
        </AuthProvider>
    );
};

export default DashboardLayout;
