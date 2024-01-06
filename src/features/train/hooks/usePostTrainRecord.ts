import IPostTrainRecord from "../interfaces/IPostTrainRecord";
import { useDependency } from "../../../general/contexts/DependencyContext";
import PostTrainRecordRequest from "../types/PostTrainRecordRequest";
import PostTrainRecordResponse from "../types/PostTrainRecordResponse";
import requests from "../../../general/requests";
import { resolve } from "path";

export default function usePostTrainRecord(): IPostTrainRecord {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<PostTrainRecordRequest, PostTrainRecordResponse>();

    function post(data: PostTrainRecordRequest): Promise<PostTrainRecordResponse | null> {
        return new Promise<PostTrainRecordResponse | null>((resolve, reject) => {
            requestManager
                .post(requests.trainRecord.post, data)
                .then(res => {
                    console.log("Posted Train Record Successfully.");
                    resolve(res);
                })
                .catch(() => {
                    console.error("Failed to post Train Record.");
                    reject(null);
                });
        });

    }

    return {
        status: requestManager.status,
        post,
    };
}
