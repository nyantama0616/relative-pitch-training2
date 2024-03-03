import IShimamura from "../interfaces/IShimamuraPage";
import { useState, useRef, useEffect } from "react";
import BasicStatus from "../../../general/types/BasicStatus";
import useSound from "use-sound";
import startSound from "../../../sounds/start.mp3";
import finishSound from "../../../sounds/finish.mp3";

function useShimamura(): IShimamura {
    const [status, setStatus] = useState<BasicStatus>(BasicStatus.Idle);
    const timerRef = useRef<NodeJS.Timer | null>(null);
    const [playStart] = useSound(startSound);
    const [playFinish] = useSound(finishSound);

    function onStart() {
        setStatus(BasicStatus.Doing);

        playStart();

        timerRef.current = setTimeout(() => {
            setStatus(BasicStatus.Success);
            playFinish();
        }, 10 * 60 * 1000); // 10分
    }

    function stop() {
        if (timerRef.current) clearTimeout(timerRef.current);
        setStatus(BasicStatus.Idle);
    }

    function onReset() {
        const confirmed = window.confirm("タイマーをリセットし、最初からやり直しますか？");
        if (confirmed) {
            console.log("confirmed");
            
            stop();
        }
    }

    useEffect(() => {
        return stop;
    }, []);

    return {
        onStart,
        onReset,
        status,
    };
}

export default useShimamura;
