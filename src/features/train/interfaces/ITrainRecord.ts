import IQuestion from "./IQuestion";

export default interface ITrainRecord {
    id: number;
    userId: number;
    questions: IQuestion[];
}
