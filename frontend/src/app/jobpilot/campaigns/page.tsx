'use client'

import ToggleSwitch from "@/components/atoms/toggleswitch";
import Checkbox from "@/components/atoms/checkbox";
import {useState} from "react";
import {Wand} from "lucide-react";


const Page = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="flex flex-col gap-6 lg:col-span-5 lg:row-span-1">
            <div className="profile flex flex-col gap-2 lg:col-span-5 lg:row-span-1">
                <h2 className="text-4xl font-bold">Campagnes</h2>
            </div>


            <div
                className="schedule-table flex flex-col gap-2 lg:col-span-4 lg:row-span-1">
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <input className=
                                   "w-96 border-black rounded-md border-2 p-2.5"
                               placeholder="Rechercher une campagne..."
                        />
                    </div>

                    <div>
                        <button
                            className="border-black flex gap-4 items-center border-2 whitespace-nowrap rounded-md bg-[#B8FF9F] hover:bg-[#9dfc7c] active:bg-[#7df752] p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            <Wand className="w-5 h-5 text-black font-bold" />
                            Créer une nouvelle campagne
                        </button>
                    </div>
                </div>

                <table className="border-collapse border-4 border-black">
                    <thead>
                    <tr>
                        <th className="border-4 border-black p-2">
                            <Checkbox checked={checked} setChecked={setChecked}/>
                        </th>
                        <th className="border-4 border-black p-2">Statut</th>
                        <th className="border-4 border-black p-2">Nom</th>
                        <th className="border-4 border-black p-2">Prospects terminés</th>
                        <th className="border-4 border-black p-2">Expéditeur</th>
                        <th className="border-4 border-black p-2">Tag</th>
                        <th className="border-4 border-black p-2">Créé à</th>
                        <th className="border-4 border-black p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="hover:bg-blue-200">
                        <td className="border-4 border-black p-2">
                            <Checkbox checked={checked} setChecked={setChecked}/>
                        </td>
                        <td className="border-4 border-black p-2">
                            <ToggleSwitch/>
                        </td>
                        <td className="border-4 border-black p-2">6:00 AM</td>
                        <td className="border-4 border-black p-2">6:00 AM</td>
                        <td className="border-4 border-black p-2">6:00 AM</td>
                        <td className="border-4 border-black p-2">6:00 AM</td>
                        <td className="border-4 border-black p-2">6:00 AM</td>
                        <td className="border-4 border-black p-2">6:00 AM</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Page;
