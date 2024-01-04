import IQuestion from "./IQuestion";

export default interface ITrainManager {
    currentQuestion: IQuestion | null;
    start(): void;
    stop(): void;
    reset(): void;
}
