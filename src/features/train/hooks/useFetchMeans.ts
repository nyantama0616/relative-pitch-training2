import IFetchMeans from "../interfaces/IFetchMeans";
import { useDependency } from "../../../general/contexts/DependencyContext";
import FetchMeansResponse from "../types/FetchMeansResponse";
import requests from "../../../general/requests";

export default function useFetchMeans(): IFetchMeans {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<null, FetchMeansResponse>();

    function fetch(id: number) {
        return new Promise<FetchMeansResponse | null>((resolve, reject) => {
            requestManager
                .get(requests.trainRecord.fetchMeans(id))
                .then(res => {
                    resolve(res);
                })
                .catch(() => {
                    reject(null);
                });
        });
    }

    return {
        fetch
    }
}
