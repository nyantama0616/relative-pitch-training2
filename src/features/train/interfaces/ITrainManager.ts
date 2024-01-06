import IQuestion from "./IQuestion";
import IInterval from "./IInterval";

export default interface ITrainManager {
    currentQuestion: IQuestion | null;
    answeredQuestions: IQuestion[];
    isAnswerable: boolean;
    prevScore: Score | null;
    start(): void;
    stop(): void;
    reset(): void;
}

export interface Score {
    interval: IInterval;
    startTime: number;
    endTime: number;
}
