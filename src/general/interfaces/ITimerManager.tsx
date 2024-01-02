export default interface ITimerManager {
    passedTime: number; // in milliseconds
    isRunning: boolean;
    INTERVAL: number;
    start: () => void;
    stop: () => void;
    reset: () => void;
}
