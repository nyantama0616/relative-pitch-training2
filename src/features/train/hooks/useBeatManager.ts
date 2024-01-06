import ITimerManager from "../../../general/interfaces/ITimerManager";
import { useEffect, useState, useRef, useCallback } from "react";
import ITrainManager from "../interfaces/ITrainManager";
import { useDependency } from "../../../general/contexts/DependencyContext";
import IBeatManager from "../interfaces/IBeatManager";
import IInterval from "../interfaces/IInterval";

const PLAY_NOTE_INTERVAL = 500;

interface State {
    isRunning: boolean;
    tempo: number;
}

interface Props {
    timer: ITimerManager;
    currentInterval: IInterval | null;
}
export default function useBeatManager({ timer, currentInterval }: Props): IBeatManager {
    const { useSoundPlayerWithTone } = useDependency();
    const soundPlayer = useSoundPlayerWithTone();

    const callBackIdRef = useRef<number | null>(null);
    
    const [state, setState] = useState<State>({
        isRunning: false,
        tempo: 100, //現状使わない
    });

    // callback内でcurrentIntervalが更新されない問題へ対処するためにrefを使う
    const intervalRef = useRef<IInterval | null>(null);
    useEffect(() => {
        intervalRef.current = currentInterval;
    }, [currentInterval]);
    
    function start(): void {
        setState({
            ...state,
            isRunning: true,
        });

        callBackIdRef.current = timer.addCallbackPerFrame(() => {
            const interval = intervalRef.current;

            if (timer.getFrameCount() % 15 !== 0 || !interval) return;
            

            const beat = timer.getFrameCount() / 15 % 4;
            if (beat === 0) {
                soundPlayer.playNote(interval!.note0, PLAY_NOTE_INTERVAL);
            } else if (beat === 1) {
                soundPlayer.playNote(interval!.note1, PLAY_NOTE_INTERVAL);
            }
        });
    }

    function stop(): void {
        setState({
            ...state,
            isRunning: false,
        });

        if (callBackIdRef.current) {
            timer.removeCallbackPerFrame(callBackIdRef.current);
            callBackIdRef.current = null;
        }
    }

    return {
        start,
        stop,
    }
}
