import Link from "next/link";
import {BriefcaseBusiness, CircleCheck, CircleGauge, Copyright, Lock, StepForward, WandSparkles} from "lucide-react";

const Sidebar = () => {
    return (
        <aside
            className="w-64 bg-mainAccent text-white flex flex-col justify-between gap-y-7 p-4 rounded-lg shadow-md border-4 border-solid border-black whitespace-nowrap">
            <div>
                <div className="text-2xl font-bold mb-6">Dashboard</div>
                <nav className="flex flex-col gap-4">
                    <Link
                        href="/jobpilot"
                        className="border-black flex gap-4 items-center text-black border-2 rounded-md bg-[#B8FF9F] hover:bg-[#9dfc7c] active:bg-[#7df752] py-2 px-4 whitespace-nowrap">
                        <CircleGauge className="w-5 h-5 text-black font-bold"/>
                        Tableau de bord
                    </Link>
                    <Link
                        href="/jobpilot/campaigns"
                        className="border-black flex gap-4 items-center text-black border-2 rounded-md bg-mainAccentGray cursor-not-allowed py-2 px-4 whitespace-nowrap">
                        <div className="flex justify-between items-center gap-4">
                            <Copyright className="w-5 h-5 text-black font-bold"/>
                            Campagnes
                        </div>
                        <Lock className="w-5 h-5 text-black font-bold"/>
                    </Link>
                    <Link
                        href="/jobpilot/jobs"
                        className="border-black flex gap-4 items-center text-black border-2 rounded-md bg-[#B8FF9F] hover:bg-[#9dfc7c] active:bg-[#7df752] py-2 px-4 whitespace-nowrap">
                        <BriefcaseBusiness className="w-5 h-5 text-black font-bold"/>
                        Jobs
                    </Link>
                    <Link
                        href="/jobpilot/templates"
                        className="border-black flex gap-4 items-center text-black border-2 rounded-md bg-mainAccentGray cursor-not-allowed py-2 px-4">
                        <div className="flex justify-between items-center gap-4">
                            <WandSparkles className="w-5 h-5 text-black font-bold"/>
                            Templates
                        </div>
                        <Lock className="w-5 h-5 text-black font-bold"/>
                    </Link>
                    <Link
                        href="/jobpilot/tasks"
                        className="border-black flex gap-4 items-center text-black border-2 rounded-md bg-mainAccentGray cursor-not-allowed py-2 px-4">
                        <div className="flex justify-between items-center gap-4">
                            <CircleCheck className="w-5 h-5 text-black font-bold"/>
                            Tâches
                        </div>
                        <Lock className="w-5 h-5 text-black font-bold"/>
                    </Link>
                </nav>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    className="border-black flex justify-between gap-4 items-center text-black border-2 rounded-md bg-[#B8FF9F] hover:bg-[#9dfc7c] active:bg-[#7df752] py-2 px-4 whitespace-nowrap">
                    <div className="flex justify-between items-center gap-4">
                        <span className="bg-gray-400 h-10 w-10 rounded-full"></span>
                        Support
                    </div>

                    <StepForward className="w-5 h-5 text-black font-bold"/>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
