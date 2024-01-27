import FetchMeansResponse from "../types/FetchMeansResponse";

export default interface IFetchMeans {
    fetch(id: number): Promise<FetchMeansResponse | null>;
}
