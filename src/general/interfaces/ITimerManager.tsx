export default interface ITimerManager {
    isRunning: boolean;
    INTERVAL: number;
    start: () => void;
    stop: () => void;
    reset: () => void;
    addCallbackPerFrame: (callback: () => void) => number;
    removeCallbackPerFrame: (id: number) => void;
    getPassedTime: () => number;
    getFrameCount: () => number;
}
