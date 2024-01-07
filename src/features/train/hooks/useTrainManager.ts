import ITrainManager, { Score } from "../interfaces/ITrainManager";
import { useDependency } from "../../../general/contexts/DependencyContext";
import { useEffect, useState } from "react";
import IQuestion from "../interfaces/IQuestion";
import ITimerManager from "../../../general/interfaces/ITimerManager";
import Note from "../../sounds/enums/Note";

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

interface State {
    isAnswerable: boolean;
    prevScore: Score | null;
}

const initialState: State = {
    isAnswerable: false,
    prevScore: null,
};

const initialQuestion: IQuestion = {
    interval: {
        note0: 60,
        note1: 60,
    },
    startTime: 0,
    keyPushes: [],
};

interface Props {
    timer: ITimerManager;
    onFinished: (questions: IQuestion[]) => void;
}
export default function useTrainManager({ timer, onFinished }: Props): ITrainManager {
    // const [isAnswerable, setIsAnswerable] = useState<boolean>(false);
    const [state, setState] = useState<State>(initialState);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(initialQuestion);
    
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
        isAnswerable: state.isAnswerable,
        currentInterval: currentQuestion?.interval || null,
        onRight: (note: Note) => {
            _pushKey(note);
            _endSet();
        },
        onWrong: (note: Note) => {
            _pushKey(note);
        },
    });

    //確実にkeyPushesが更新されるようにするため
    useEffect(() => {
        if (currentQuestion === null || currentQuestion!.keyPushes.length === 0) return;

        const lastKey = currentQuestion!.keyPushes[currentQuestion!.keyPushes.length - 1].note;
        if (lastKey === currentQuestion!.interval.note1) {
            _nextQuestion();
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (beatManager.beatCount % 4 === 1 && !state.isAnswerable) {
            _startSet();
        }
    }, [beatManager.beatCount]);

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

    function _pushKey(note: number): void {
        setCurrentQuestion({
            ...currentQuestion!,
            keyPushes: [...currentQuestion!.keyPushes, {
                time: timer.getPassedTime(),
                note: note,
            }],
        });
    }

    function _nextQuestion(): void {
        if (currentQuestion) {
            const a = [...answeredQuestions, currentQuestion!];
            setAnsweredQuestions(a);
    
            if (a.length >= PRESENT_NUM_PER_NOTE * 2) { //本番は12
                stop();
                onFinished(a);
                return;
            }
        }

        //ここではintervalだけ更新する
        setCurrentQuestion(prev => {
            return {
                ...prev!,
                interval: intervalGenerator.generate(),
            }
        });
    }

    function _startSet() {
        console.log("startSet");
        
        setState({
            prevScore: null,
            isAnswerable: true,
        });

        setCurrentQuestion(prev => {
            return {
                ...prev!,
                startTime: timer.getPassedTime(),
                keyPushes: [],
            }   
        })
    }

    function _endSet() {
        console.log("endSet");
        
        setState(prev => {
            return {
                prevScore: {
                    interval: currentQuestion!.interval,
                    startTime: currentQuestion!.startTime,
                    endTime: timer.getPassedTime(),
                },
                isAnswerable: false,
            }
        });
    }

    return {
        currentQuestion,
        answeredQuestions,
        isAnswerable: state.isAnswerable,
        prevScore: state.prevScore,        
        start,
        stop,
        reset,
    }
}
