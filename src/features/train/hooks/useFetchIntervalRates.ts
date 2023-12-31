import { useDependency } from "../../../general/contexts/DependencyContext";
import requests from "../../../general/requests";
import IFetchIntervalRates from "../interfaces/IFetchIntervalRates";
import FetchIntervalRecordRequest from "../types/FetchIntervalRecordRequest";
import FetchIntervalRecordResponse from "../types/FetchIntervalRecordResponse";

export default function useFetchIntervalRates(): IFetchIntervalRates {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<FetchIntervalRecordRequest, FetchIntervalRecordResponse>();

    function fetch(id: number): Promise<FetchIntervalRecordResponse | null> {
        return new Promise<FetchIntervalRecordResponse | null>((resolve, reject) => {
            requestManager
                .get(requests.trainRecord.fetchIntervalRates(id))
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
    };
}
