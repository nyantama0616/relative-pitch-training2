import ITrainManager from "../interfaces/ITrainManager";
import { useDependency } from "../../../general/contexts/DependencyContext";
import { useState } from "react";
import IQuestion from "../interfaces/IQuestion";
import ITimerManager from "../../../general/interfaces/ITimerManager";

export default function useTrainManager(timer: ITimerManager): ITrainManager {
    const mockQuestion: IQuestion = {
        interval: {
            note0: 60,
            note1: 64,
        },
        startTime: 0,
        keyPushes: [
            {
                time: 0,
                note: 60,
            },
            {
                time: 500,
                note: 64,
            },
            {
                time: 700,
                note: 84,
            },
        ],
    };
    // const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(mockQuestion);

    const { useBeatManager } = useDependency();
    const beatManager = useBeatManager(timer, currentQuestion?.interval || null);

    function start() {
        timer.start();
        beatManager.start();
    }

    function stop() {
        timer.stop();
        beatManager.stop();
    }

    function reset(): void {
        setCurrentQuestion(null);
        timer.reset();
    }

    return {
        currentQuestion,
        start,
        stop,
        reset,
    }
}
