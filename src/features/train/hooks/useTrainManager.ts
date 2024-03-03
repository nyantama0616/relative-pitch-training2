import ITrainManager, { Score } from "../interfaces/ITrainManager";
import { useDependency } from "../../../general/contexts/DependencyContext";
import { useEffect, useState } from "react";
import IQuestion from "../interfaces/IQuestion";
import ITimerManager from "../../../general/interfaces/ITimerManager";
import Note from "../../sounds/enums/Note";
import getNoteName from "../../sounds/lib/getNoteName";
import IMidiIO from "../../sounds/interfaces/IMidiIO";
import { useAuth } from "../../auth/contexts/AuthContext";

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

interface State {
    isAnswerable: boolean;
    prevScore: Score | null;
    isWaiting: boolean;
}

//TODO: ここでprevScoreをnullにすると、startSetより前にDurationBarが動く。クソグラムのせい
const initialState: State = {
    isAnswerable: false,
    prevScore: {
        interval: {
            note0: 60,
            note1: 60,
        },
        startTime: -1,
        endTime: -1,
    },
    isWaiting: false,
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
    midiIO: IMidiIO;
    PRESENT_NUM_PER_NOTE: number;
    onFinished: (questions: IQuestion[]) => void;
}
export default function useTrainManager({ timer, midiIO, PRESENT_NUM_PER_NOTE, onFinished }: Props): ITrainManager {
    // const [isAnswerable, setIsAnswerable] = useState<boolean>(false);
    const [state, setState] = useState<State>(initialState);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(initialQuestion);
    
    // const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(mockQuestion);
    const [answeredQuestions, setAnsweredQuestions] = useState<IQuestion[]>([]);

    const { useBeatManager, useAnswerManager, useIntervalGenerator } = useDependency();
    const beatManager = useBeatManager({
        timer,
        currentInterval: currentQuestion?.interval || null,
        flagPlayNote: !state.isWaiting,
    });

    const answerManager = useAnswerManager({
        midiIO,
        isAnswerable: state.isAnswerable,
        currentInterval: currentQuestion?.interval || null,
        flagPlayNoteOnAnswer: true,
        onRight: (note: Note) => {
            _pushKey(note);
            _endSet();
        },
        onWrong: (note: Note) => {
            _pushKey(note);
        },
    });

    const { requireSignIn } = useAuth();

    useEffect(() => {
        requireSignIn();
    }, []);

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
            if (state.isWaiting) {
                // console.log("skip!");
                
                setState(prev => {
                    return {
                        ...prev,
                        isWaiting: false,
                    }
                });
            } else {
                _startSet();
            }
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
        setCurrentQuestion(prev => {
            return {
                interval: { ...prev!.interval },
                startTime: prev!.startTime,
                keyPushes: [...prev!.keyPushes, {
                    time: timer.getPassedTime(),
                    note: note,
                }],
            }
        });
    }

    function _nextQuestion(): void {
        let a: IQuestion[] = [];
        if (currentQuestion) {
            a = [...answeredQuestions, currentQuestion!];
            setAnsweredQuestions(a);
        }

        const nextInterval = intervalGenerator.generate();

        if (nextInterval === null) {
            stop();
            onFinished(a);
            return;
        }

        //ここではintervalだけ更新する
        setCurrentQuestion(prev => {
            return {
                startTime: prev!.startTime,
                keyPushes: prev!.keyPushes,
                interval: nextInterval!,
            }
        });
    }

    function _startSet() {
        setState({
            prevScore: null,
            isAnswerable: true,
            isWaiting: false,
        });

        setCurrentQuestion(prev => {
            return {
                interval: { ...prev!.interval },
                startTime: timer.getPassedTime(),
                keyPushes: [],
            }   
        })
    }

    function _endSet() {
        let isWaiting = false;
        if (beatManager.beatCount % 4 === 0) {
            isWaiting = true;
        }
        
        setState(prev => {
            return {
                prevScore: {
                    interval: currentQuestion!.interval,
                    startTime: currentQuestion!.startTime,
                    endTime: timer.getPassedTime(),
                },
                isAnswerable: false,
                isWaiting: isWaiting,
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
