import api from "@/config/api";
import {useQuery} from "@tanstack/react-query";
import job from "@/types/jobs/job";

const fetchJobs = async (url: string): Promise<job[]> => {
    const response = await api.get(url)
    return response.data
}


const useJobs = (url: string, keydata: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [`${keydata}`],
        queryFn: () => fetchJobs(url),
    })

    return { data, isLoading, isError, error }
}

export default useJobs;
