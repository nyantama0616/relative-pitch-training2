import ITimerManager from "../../../general/interfaces/ITimerManager";
import { useEffect, useState, useRef, useCallback } from "react";
import ITrainManager from "../interfaces/ITrainManager";
import { useDependency } from "../../../general/contexts/DependencyContext";
import IBeatManager from "../interfaces/IBeatManager";
import IInterval from "../interfaces/IInterval";
import Sound from "../../sounds/enums/Sound";

const PLAY_NOTE_INTERVAL = 500;

interface State {
    isRunning: boolean;
    tempo: number;
    beatCount: number;
}

interface Props {
    timer: ITimerManager;
    currentInterval: IInterval | null;
    flagPlayNote: boolean;
}
export default function useBeatManager({ timer, currentInterval, flagPlayNote }: Props): IBeatManager {
    const { useSoundPlayerWithTone } = useDependency();
    const soundPlayer = useSoundPlayerWithTone();

    const callBackIdRef = useRef<number | null>(null);
    
    const [state, setState] = useState<State>({
        isRunning: false,
        tempo: 100, //現状使わない
        beatCount: -1,
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

            //beatCountをインクリメント
            setState(prev => {
                const beatCount = prev.beatCount + 1;
                if (flagPlayNote) {
                    if (beatCount % 4 === 0) {
                        soundPlayer.playNote(interval!.note0, PLAY_NOTE_INTERVAL, Sound.Synth);
                    } else if (beatCount % 4 === 1) {
                        soundPlayer.playNote(interval!.note1, PLAY_NOTE_INTERVAL, Sound.Synth);
                    }
                }

                return {
                    ...prev,
                    beatCount,
                }
            });
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
        beatCount: state.beatCount,
        start,
        stop,
    }
}
