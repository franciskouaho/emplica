import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 rounded-lg">
            <div className="text-2xl font-bold mb-6">Dashboard</div>
            <nav className="flex flex-col gap-4">
                <Link href="#" className="hover:bg-gray-700 p-2 rounded">Home</Link>
                <Link href="#" className="hover:bg-gray-700 p-2 rounded">Settings</Link>
                <Link href="#" className="hover:bg-gray-700 p-2 rounded">Profile</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
