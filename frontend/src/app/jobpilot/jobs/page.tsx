'use client'

import Checkbox from "@/components/atoms/checkbox";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "@/config/api";
import useJobs from "@/hooks/useJobs";
import {ToastAction} from "@/components/ui/toast";
import {useToast} from "@/hooks/use-toast";
import {ScanSearch, TestTube, Lock} from "lucide-react";
import MatchingScore from "@/components/molecules/matching-score";
import job from "@/types/jobs/job";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const Page = () => {
    const queryClient = useQueryClient()

    const {toast} = useToast();
    const {data: jobs, isLoading, isError} = useJobs('get_jobs', 'jobs');

    const [selectedJob, setSelectedJob] = useState<job | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12;

    console.log(jobs)

    const handleScrappeWelcomeToTheJungle = useMutation({
        mutationFn: () => api.get('get_companies'),
        onSuccess: async () => {
            const get_jobs = await api.get('get_jobs')

            if (get_jobs.status === 200) {
                const saveFile = await api.get('process_files_from_bucket')

                if (saveFile.status === 200) {
                    toast({
                        title: "Job scrapped",
                        description: "Job scrapped from Welcome to the jungle",
                    });
                    await queryClient.invalidateQueries({queryKey: ['jobs']});
                }
            }


        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: "Job scrapped",
                description: "Job scrapped from Welcome to the jungle",
            });
        }
    });

    const handleScanSearchClick = (job: job) => {
        setSelectedJob(job);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isDrawerOpen && !(event.target as HTMLElement).closest('.drawer-content')) {
                handleCloseDrawer();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDrawerOpen]);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs && jobs.slice(indexOfFirstJob, indexOfLastJob);

    const totalPages = jobs ? Math.ceil(jobs.length / jobsPerPage) : 0;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getPageNumbers = () => {
        const maxButtons = 6;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 > maxButtons) {
            startPage = endPage - maxButtons + 1;
        }

        const pageNumbers = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
        if (startPage > 1) {
            pageNumbers.unshift(1);
        }
        if (endPage < totalPages) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex flex-col gap-6 lg:col-span-5 lg:row-span-1">
            <div className="profile flex flex-col gap-2 lg:col-span-5 lg:row-span-1">
                <h2 className="text-2xl md:text-4xl font-bold">Recherche de jobs</h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <button
                    onClick={() => handleScrappeWelcomeToTheJungle.mutate()}
                    className="border-black flex gap-4 items-center border-2 whitespace-nowrap rounded-md bg-[#B8FF9F] hover:bg-[#9dfc7c] active:bg-[#7df752] p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <TestTube className="w-5 h-5 text-black font-bold"/>
                    Via Welcome to the jungle
                </button>

                <button
                    className="border-black flex gap-4 items-center border-2 whitespace-nowrap rounded-md bg-mainAccentGray cursor-not-allowed p-2.5">
                    <TestTube className="w-5 h-5 text-black font-bold"/>
                    via LinkedIn
                    <Lock className="w-5 h-5 text-black font-bold"/>
                </button>

                <button
                    className="border-black flex gap-4 items-center border-2 whitespace-nowrap rounded-md bg-mainAccentGray cursor-not-allowed p-2.5">
                    <TestTube className="w-5 h-5 text-black font-bold"/>
                    via Indeed
                    <Lock className="w-5 h-5 text-black font-bold"/>
                </button>
            </div>

            <div className="flex flex-col gap-2 lg:col-span-4 lg:row-span-1">
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <input
                            className="w-full md:w-96 border-black rounded-md border-2 p-2.5"
                            placeholder="Rechercher une campagne..."
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="border-collapse border-4 border-black w-full">
                        <thead>
                        <tr>
                            <th className="border-4 border-black p-2">
                                <Checkbox checked={checked} setChecked={setChecked}/>
                            </th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Nom entreprise</th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Titre du poste</th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Salaire</th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Ville</th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Expérience</th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Type de contrat</th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Créé à</th>
                            <th className="border-4 border-black p-2 whitespace-nowrap">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={10} className="text-center p-2">Loading...</td>
                            </tr>
                        ) : isError ? (
                                <tr>
                                    <td colSpan={10} className="text-center p-2">Error loading data</td>
                                </tr>
                            ) :
                            currentJobs && currentJobs.map((job: any, index: number) => (
                                <tr key={index} className="hover:bg-blue-200">
                                    <td className="border-4 border-black p-2">
                                        <Checkbox checked={checked} setChecked={setChecked}/>
                                    </td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">{job.name_company}</td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span>{job.name_job && job.name_job.length > 16 ? `${job.name_job.substring(0, 16)}...` : job.name_job}</span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <span>{job.name_job}</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">{job.salary_minimum && job.salary_maximum ? `${job.salary_minimum}€ - ${job.salary_maximum}€ ` : 'NR'}</td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">{job.city ? job.city : 'NR'}</td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">NR</td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">NR</td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">{job.published_at_date}</td>
                                    <td className="border-4 border-black p-2 whitespace-nowrap">
                                        <ScanSearch
                                            className="w-5 h-5 text-black font-bold cursor-pointer hover:text-mainAccentGreen"
                                            onClick={() => handleScanSearchClick(job)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-black border-2 rounded-md p-2 mx-1"
                    >
                        Previous
                    </button>
                    {getPageNumbers().map((number, index) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`border-black border-2 rounded-md p-2 mx-1 ${currentPage === number ? 'bg-gray-300' : ''}`}
                        >
                            {index === 0 && number !== 1 ? 1 : number}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-black border-2 rounded-md p-2 mx-1"
                    >
                        Next
                    </button>
                </div>
            </div>
            {selectedJob && isDrawerOpen && <MatchingScore job={selectedJob}/>}
        </div>
    );
}

export default Page;
