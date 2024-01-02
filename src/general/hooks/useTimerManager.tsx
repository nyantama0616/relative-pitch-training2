import { useState, useRef, useEffect } from "react";
import ITimerManager from "../interfaces/ITimerManager";

const INTERVAL = 33; // 30 fps

export default function useTimerManager(): ITimerManager {
    const passedTimeRef = useRef<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const intervalRef = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        return stop;
    }, []);

    function start() {
        if (intervalRef.current) {
            console.warn('Timer is already running.');
            stop();
            return;
        }

        intervalRef.current = setInterval(() => {
            passedTimeRef.current += INTERVAL;
        }, INTERVAL);
        
        setIsRunning(true);
    }

    function stop() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setIsRunning(false);
    }

    function reset() {
        stop();
        passedTimeRef.current = 0;
    }

    return {
        passedTime: passedTimeRef.current,
        isRunning,
        INTERVAL,
        start,
        stop,
        reset,
    }
}
