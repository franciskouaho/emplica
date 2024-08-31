import TopBar from "@/components/organisms/topbar";
import {FunctionComponent, ReactNode} from "react";
import Sidebar from "@/components/organisms/sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({children}) => {
    return (
        <div className="flex h-screen w-screen bg-gradient-to-r from-gray-200 to-gray-100 p-4">
            <Sidebar/>
            <div className="flex-1 flex flex-col px-3 gap-2">
                <TopBar/>
                <main className="flex-1 p-6 bg-white rounded-lg shadow-md">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
