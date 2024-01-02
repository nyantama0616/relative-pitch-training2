export default interface ITimerManager {
    passedTime: number; // in milliseconds
    isRunning: boolean;
    frameCount: number;
    INTERVAL: number;
    start: () => void;
    stop: () => void;
    reset: () => void;
}
