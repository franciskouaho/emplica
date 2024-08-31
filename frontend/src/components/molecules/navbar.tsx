import {Button} from "@/components/ui/button";

const Navbar = () => {
    return (
        <div className="flex justify-center sticky top-3 z-50">
            <div className=" max-w-[70rem] w-full">
                <div className="rounded-2xl flex justify-center items-center h-16 bg-white px-4 py-2 shadow-xl">
                    <div className="flex justify-between items-center w-full">
                        <div className="text-2xl font-bold">Logo</div>
                        <div className="flex items-center gap-4 text-sm">
                            <a href="#" className="text-sm">Home</a>
                            <a href="#" className="text-sm">About</a>
                            <a href="#" className="text-sm">Contact</a>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="neutral" size="sm" className="text-sm">
                                Log in
                            </Button>

                            <Button size="sm" className="text-sm">
                                Sign up for free
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
