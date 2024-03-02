import IPostTrainRecord from "../interfaces/IPostTrainRecord";
import { useDependency } from "../../../general/contexts/DependencyContext";
import PostTrainRecordRequest from "../types/PostTrainRecordRequest";
import PostTrainRecordResponse from "../types/PostTrainRecordResponse";
import requests from "../../../general/requests";
import BasicStatus from "../../../general/types/BasicStatus";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/contexts/AuthContext";


interface DownloadState {
    downloadURL: string;
    downloadFileName: string;
}

const initialDownloadState: DownloadState = {
    downloadURL: "",
    downloadFileName: "",
}

export default function usePostTrainRecord(): IPostTrainRecord {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<PostTrainRecordRequest, PostTrainRecordResponse>();
    const [downloadState, setDownloadState] = useState<DownloadState>(initialDownloadState);
    const auth = useAuth();

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
                    console.log(data);
                    reject(null);
                })
                .finally(() => {
                    manageDownloadState(data);
                });
        });
    }

    function manageDownloadState(data: PostTrainRecordRequest) {
        const userName = auth.currentUser?.userName || 'user';
        const date = new Date().toISOString().split('T')[0];
        const filename = `${userName}_${date}.txt`;
        const text = JSON.stringify(data, null, 2);
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const href = URL.createObjectURL(blob);

        setDownloadState({
            downloadURL: href,
            downloadFileName: filename,
        });
    }

    useEffect(() => {        
        return () => {
            URL.revokeObjectURL(downloadState.downloadURL);
        };
    }, [downloadState]);

    return {
        status: requestManager.status,
        post,
        ...downloadState,
    };
}
