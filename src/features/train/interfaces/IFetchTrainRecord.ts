import BasicStatus from "../../../general/types/BasicStatus";
import FetchTrainRecordResponse from "../types/FetchTrainRecordResponse";

export default interface IFetchTrainRecord {
    status: BasicStatus;
    fetch(id: number): Promise<FetchTrainRecordResponse | null>;
}
