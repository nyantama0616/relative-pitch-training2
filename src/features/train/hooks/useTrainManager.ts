import ITrainManager from "../interfaces/ITrainManager";
import { useDependency } from "../../../general/contexts/DependencyContext";
import { useState } from "react";
import IQuestion from "../interfaces/IQuestion";
import ITimerManager from "../../../general/interfaces/ITimerManager";

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

const PRESENT_NUM_PER_NOTE = 5;

interface Props {
    timer: ITimerManager;
    onFinished: () => void;
}
export default function useTrainManager({timer, onFinished}: Props): ITrainManager {
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
    // const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(mockQuestion);
    const [answeredQuestions, setAnsweredQuestions] = useState<IQuestion[]>([]);

    const { useBeatManager, useAnswerManager, useMidiIO, useIntervalGenerator } = useDependency();
    const beatManager = useBeatManager({
        timer,
        currentInterval: currentQuestion?.interval || null,
    });

    const midiIO = useMidiIO();
    const answerManager = useAnswerManager({
        midiIO,
        isAnswerable: true,
        currentInterval: currentQuestion?.interval || null,
        onRight: () => {
            console.log("right");
            _nextQuestion();
        },
        onWrong: () => {
            console.log("wrong");
            setCurrentQuestion({
                ...currentQuestion!,
                keyPushes: [...currentQuestion!.keyPushes, {
                    time: timer.getPassedTime(),
                    note: midiIO.inputMessage!.note,
                }],
            });
        },
    });

    const intervalGenerator = useIntervalGenerator(PRESENT_NUM_PER_NOTE);

    function start() {
        _nextQuestion();
        timer.start();
        beatManager.start();
        answerManager.start();
    }

    function stop() {
        timer.stop();
        beatManager.stop();
        answerManager.stop();
    }

    function reset(): void {
        setCurrentQuestion(null);
        timer.reset();
    }

    function _nextQuestion(): void {
        if (currentQuestion) {
            const a = [...answeredQuestions, currentQuestion!];
            setAnsweredQuestions(a);
    
            if (a.length >= PRESENT_NUM_PER_NOTE * 2) { //本番は12
                stop();
                onFinished();
                return;
            }
        }

        setCurrentQuestion({
            interval: intervalGenerator.generate(),
            startTime: timer.getPassedTime(),
            keyPushes: [],
        });
    }

    return {
        currentQuestion,
        answeredQuestions,
        start,
        stop,
        reset,
    }
}
