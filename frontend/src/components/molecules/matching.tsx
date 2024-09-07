'use client';

import job from "@/types/jobs/job";
import {ChangeEvent, FormEvent, FunctionComponent, useRef, useState} from "react";
import {BriefcaseBusiness, ExternalLink, FileText} from "lucide-react";
import ScoreMeter from "@/components/molecules/score-meter";
import {useMutation} from "@tanstack/react-query";
import api from "@/config/api";
import {toast} from "@/hooks/use-toast";
import MatchingScore from "@/types/matching-score.ts/matching-score";
import Link from "next/link";

interface MatchingProps {
    job: job;
}


const Matching: FunctionComponent<MatchingProps> = ({job}) => {
    const [file, setFile] = useState<File | null>(null);
    const [score, setScore] = useState<MatchingScore>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleFileUpload = useMutation({
        mutationFn: () => api.post('match', {
            cv_file: file,
            job_name: job.slug
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: (data) => {
            setScore(data.data);
            toast({
                title: "CV Uploaded",
                description: "Your CV has been successfully uploaded and matched with the job.",
            });
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: "Upload Failed",
                description: "There was an error uploading your CV. Please try again.",
            });
        }
    });


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFileUpload.mutate();
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-20 items-center justify-center ">
            <div className="bg-white flex flex-col rounded-lg shadow-lg border-black border-2">
                <div className="flex justify-center items-center border-b-2 border-gray-200 p-4">
                    <div className="flex gap-4 items-center justify-center text-center font-semibold">
                        <p>{job.name_job}</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="flex justify-center items-center p-8 w-1/3">
                        <div className="flex flex-col items-center">
                            <div
                                className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-lg border-black border-2">
                                <BriefcaseBusiness className="w-12 h-12 text-black font-bold"/>
                            </div>
                            <h2 className="text-center mt-6 text-lg font-semibold">
                                {job.name_company}
                            </h2>
                        </div>
                    </div>
                    <div className="flex justify-center items-center p-8 w-1/3">
                        <div className="flex flex-col items-center">
                            <div className="text-sm text-gray-500">
                                {job.published_at_date}
                            </div>
                            <div className="flex items-center mt-12">
                                <ScoreMeter score={score && score.skill_match_percentage}/>
                            </div>
                            <div className="flex mt-2 pb-3">
                                <button
                                    className="mx-1 border border-gray-400 bg-gray-100 rounded text-sm font-semibold text-gray-500 px-2 py-1 whitespace-nowrap">{job.city}
                                </button>
                                <button
                                    className="mx-1 border border-gray-400 bg-gray-100 rounded text-sm font-semibold text-gray-500 px-2 py-1">N/A
                                </button>
                                <button
                                    className="mx-1 border border-gray-400 bg-gray-100 rounded text-sm font-semibold text-gray-500 px-2 py-1 whitespace-nowrap"> ${job.salary_minimum}€
                                    - {job.salary_maximum}€
                                </button>
                            </div>
                            <button
                                type="submit"
                                className={`absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 border-black border-2 rounded-md p-2 ${file ? 'bg-mainAccentGreen hover:bg-[#9dfc7c] active:bg-[#7df752]' : 'bg-gray-300 cursor-not-allowed'}`}
                                disabled={!file}
                            >
                                Lancer le score matching !
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center p-8 w-1/3">
                        <div className="flex flex-col items-center">
                            <div
                                className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-lg border-black border-2"
                                onClick={handleClick}
                            >
                                <FileText className="w-12 h-12 text-black font-bold"/>
                                <input type="file" onChange={handleFileChange} ref={fileInputRef} className="hidden"/>
                            </div>
                            <h2 className="text-center mt-6 text-lg font-semibold">Mon Profil</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 items-center justify-center">
                <div
                    className="w-full bg-white rounded-lg shadow-lg border-black border-2 flex border-b-2 p-4">
                    <p className="w-full flex justify-between text-center">
                        {job.name_job}
                        <Link target="_blank"
                              href={`https://www.welcometothejungle.com/fr/companies/${job.name_company}/jobs/${job.slug}`}
                              className="text-black hover:text-mainAccent"><ExternalLink/></Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default Matching;
