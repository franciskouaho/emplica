const Page = () => {
    return (
        <div className="grid gap-4 max-w-8xl mx-auto lg:grid-cols-8 lg:grid-rows-auto">

            <div className="flex flex-col gap-2 lg:col-span-5 ">
                <h2 className="text-4xl font-bold">Bonjour, Francis</h2>
                <p className="text-lg">Continuez à chercher et
                    vous trouverez ! 🌞</p>

            </div>

            <div
                className="schedule-table bg-white border-4 border-black shadow-lg flex flex-col gap-2 p-4 lg:col-span-4 lg:row-span-1">
                <h2 className="text-xl font-bold">Hebdomadaire</h2>
                <div className="overflow-x-auto">
                    <table className="border-collapse w-full">
                        <tbody>
                        <tr>
                            <th className="border-4 border-black p-2 bg-pink-200">Jour</th>
                            <th className="border-4 border-black p-2 bg-green-200">Nom entreprise</th>
                            <th className="border-4 border-black p-2 bg-purple-200">Date</th>
                        </tr>
                        <tr className="hover:bg-blue-200">
                            <td className="border-4 border-black p-2">Monday</td>
                            <td className="border-4 border-black p-2">Running</td>
                            <td className="border-4 border-black p-2">6:00 AM</td>
                        </tr>
                        <tr className="hover:bg-blue-200">
                            <td className="border-4 border-black p-2">Tuesday</td>
                            <td className="border-4 border-black p-2">Swimming</td>
                            <td className="border-4 border-black p-2">7:00 AM</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className="personal-bests bg-green-200 border-4 border-black shadow-lg flex flex-col gap-2 p-4 lg:col-span-2 lg:row-span-1">
                <h2 className="text-xl font-bold">Favoris</h2>
                <ul className="grid gap-2">
                    <li className="bg-white border-4 border-black p-2 hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px]">Fastest
                        5K Run: 22 min
                    </li>
                    <li className="bg-white border-4 border-black p-2 hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px]">Heaviest
                        Deadlift: 250 lbs
                    </li>
                    <li className="bg-white border-4 border-black p-2 hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px]">Longest
                        Plank: 3 min
                    </li>
                </ul>
            </div>

            <div
                className="challenges bg-white border-4 border-black shadow-lg flex flex-col gap-2 p-4 lg:col-span-2 lg:row-span-1">
                <h2 className="text-xl font-bold">Statues des candidatures</h2>
                <ul className="grid gap-2">
                    <li className="bg-white border-4 border-black p-2 hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px]">
                        40 complétées
                    </li>
                    <li className="bg-white border-4 border-black p-2 hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px]">
                        10 encours
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Page;
