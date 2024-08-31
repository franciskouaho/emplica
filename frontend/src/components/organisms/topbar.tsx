const TopBar = () => {
    return (
        <header className="h-16 bg-gray-200 flex items-center justify-between px-6 rounded-lg">
            <div className="text-xl font-semibold">Welcome back!</div>
            <div className="flex items-center space-x-4">
                <span className="bg-gray-400 h-10 w-10 rounded-full"></span>
                <span className="text-sm">User Name</span>
            </div>
        </header>
    );
};

export default TopBar;
