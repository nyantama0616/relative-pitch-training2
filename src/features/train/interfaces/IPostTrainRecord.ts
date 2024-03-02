import BasicStatus from "../../../general/types/BasicStatus";
import PostTrainRecordRequest from "../types/PostTrainRecordRequest";
import PostTrainRecordResponse from "../types/PostTrainRecordResponse";

export default interface IPostTrainRecord {
    status: BasicStatus;
    post(data: PostTrainRecordRequest): Promise<PostTrainRecordResponse | null>;
    downloadURL: string;
    downloadFileName: string;
}
