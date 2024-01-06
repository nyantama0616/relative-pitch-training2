import { useState, useRef, useEffect, useMemo } from "react";
import ITimerManager from "../interfaces/ITimerManager";

const INTERVAL = 33; // 30 fps

type Callbacks = {
    id: number,
    callbacks: {
        [key: number]: () => void
    }
}

export default function useTimerManager(): ITimerManager {
    const passedTimeRef = useRef<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const callBacksPerFrameRef = useRef<Callbacks>({ id: 0, callbacks: {} });

    useEffect(() => {
        return stop;
    }, []);

    function getFrameCount() {
        return Math.floor(passedTimeRef.current / INTERVAL);
    }

    function start() {
        if (intervalRef.current) {
            console.warn('Timer is already running.');
            stop();
        }

        intervalRef.current = setInterval(() => {
            passedTimeRef.current += INTERVAL;
            Object.values(callBacksPerFrameRef.current.callbacks).forEach(callback => {
                callback();
            });
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

    function addCallbackPerFrame(callback: () => void): number {
        if (isRunning) {
            console.error('You cannot add callback while timer is running.');
            return -1;
        }

        const id = callBacksPerFrameRef.current.id++;
        callBacksPerFrameRef.current.callbacks[id] = callback;
        return id;
    }

    function removeCallbackPerFrame(id: number) {
        if (isRunning) {
            console.error('You cannot remove callback while timer is running.');
            return;
        }

        delete callBacksPerFrameRef.current.callbacks[id];
    }

    return {
        isRunning,
        INTERVAL,
        start,
        stop,
        reset,
        addCallbackPerFrame,
        removeCallbackPerFrame,
        getFrameCount,
        getPassedTime: () => passedTimeRef.current,
    }
}
