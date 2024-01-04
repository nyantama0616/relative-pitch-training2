import ITrainManager from "../interfaces/ITrainManager";
import { useDependency } from "../../../general/contexts/DependencyContext";
import { useState } from "react";
import IQuestion from "../interfaces/IQuestion";

export default function useTrainManager(): ITrainManager {
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
    
    const { useTimerManager } = useDependency();
    const timer = useTimerManager();

    function reset(): void {
        setCurrentQuestion(null);
        timer.reset();
    }

    return {
        currentQuestion,
        start: timer.start,
        stop: timer.stop,
        reset,
    }
}
