import IFetchTrainRecord from "../interfaces/IFetchTrainRecord";
import { useDependency } from "../../../general/contexts/DependencyContext";
import FetchTrainRecordRequest from "../types/FetchTrainRecordRequest";
import FetchTrainRecordResponse from "../types/FetchTrainRecordResponse";
import requests from "../../../general/requests";

export default function useFetchTrainRecord(): IFetchTrainRecord {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<FetchTrainRecordRequest, FetchTrainRecordResponse>();

    function fetch(id: number): Promise<FetchTrainRecordResponse | null> {
        return new Promise<FetchTrainRecordResponse | null>((resolve, reject) => {
            requestManager
                .get(requests.trainRecord.fetch(id))
                .then(res => {
                    resolve(res);
                })
                .catch(() => {
                    reject(null);
                });
        });
    }

    return {
        status: requestManager.status,
        fetch
    }
}
