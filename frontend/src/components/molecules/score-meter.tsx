import {FunctionComponent} from "react";
import progressBar from "@/components/atoms/progressBar";


interface ScoreMeterProps {
    score: number | undefined
}

const ScoreMeter: FunctionComponent<ScoreMeterProps> = ({score = 0}) => {
    return (
        <div className="flex justify-center items-center mb-24">
            <div className="w-52 h-30 relative overflow-hidden flex items-end justify-center">
                <div className="absolute w-full rounded-full top-0">
                    <div>{progressBar(100)}</div>
                    <div className="absolute top-0">{score ? progressBar(score, true) : ''}</div>
                </div>

                <div className="mb-5 mt-14 text-center z-10">
                    <div className="text-gray-500">Score</div>
                    <div className="text-2xl font-semibold">
                        <span className="text-3xl font-semibold text-purple-600">{score ? Math.round(score) : (<span
                            className="text-3xl font-semibold text-red-600">0</span>)}</span>
                        <span className="text-3xl font-semibold">%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreMeter;
