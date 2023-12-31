import BasicStatus from "../../../general/types/BasicStatus";
import FetchIntervalRecordResponse from "../types/FetchIntervalRecordResponse";

export default interface IFetchIntervalRates {
    status: BasicStatus;
    fetch(id: number): Promise<FetchIntervalRecordResponse | null>;
}
