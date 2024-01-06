import IQuestion from "./IQuestion";

export default interface ITrainManager {
    currentQuestion: IQuestion | null;
    answeredQuestions: IQuestion[];
    start(): void;
    stop(): void;
    reset(): void;
}
