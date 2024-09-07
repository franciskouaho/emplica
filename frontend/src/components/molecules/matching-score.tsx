import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { FunctionComponent } from "react";
import job from "@/types/jobs/job";
import Matching from "@/components/molecules/matching";
import Link from "next/link";

interface MatchingScoreProps {
    job: job;
}

const MatchingScore: FunctionComponent<MatchingScoreProps> = ({ job }) => {
    console.log("Drawer job", job);

    return (
        <Drawer direction="right" open={true}>
            <DrawerContent
                className="drawer-content h-screen top-0 right-0 left-auto mt-0 w-[750px] rounded-none border-black border-2">
                <div className="mx-auto w-full">
                    <DrawerHeader className="flex flex-col items-center gap-2">
                        <DrawerTitle>
                            <h2 className="text-2xl font-semibold">Matching score</h2>
                        </DrawerTitle>
                        <DrawerDescription>
                            <p className="text-sm text-gray-500">See how well you match with this job</p>
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="w-full flex flex-col justify-center items-center gap-20">
                        <Matching job={job} />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default MatchingScore;
