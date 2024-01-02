import { useState, useRef, useEffect, useMemo } from "react";
import ITimerManager from "../interfaces/ITimerManager";

const INTERVAL = 33; // 30 fps

export default function useTimerManager(): ITimerManager {
    const [passedTime, setPassedTime] = useState<number>(0);
    const frameCount = useMemo(() => Math.floor(passedTime / INTERVAL), [passedTime]);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const intervalRef = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        return stop;
    }, []);

    function start() {
        if (intervalRef.current) {
            console.warn('Timer is already running.');
            stop();
        }

        intervalRef.current = setInterval(() => {
            setPassedTime(prev => prev + INTERVAL);
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
        setPassedTime(0);
    }

    return {
        passedTime,
        isRunning,
        INTERVAL,
        frameCount,
        start,
        stop,
        reset,
    }
}
