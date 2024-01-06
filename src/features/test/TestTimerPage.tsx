import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import { Button, Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";

export default function TestTimer() {
    const { useTimerManager } = useDependency();
    const { start, stop, reset, isRunning, addCallbackPerFrame, removeCallbackPerFrame, getPassedTime, getFrameCount } = useTimerManager();

    const [, forceUpdate] = useState({}); // to force re-rendering
    const callbackIdRef = useRef<number | null>(0);
    
    function _start() {
        callbackIdRef.current = addCallbackPerFrame(() => {
            forceUpdate({});
            if (getFrameCount() % 30 == 0) {
                console.log(getFrameCount() / 30);
            }
        });
        
        start();
    }

    function _stop() {
        stop();
    }
    
    useEffect(() => {
        return _stop;
    }, []);

    useEffect(() => {
        if (!isRunning && callbackIdRef.current !== null) {
            removeCallbackPerFrame(callbackIdRef.current);
            callbackIdRef.current = null;
        }
    }, [isRunning]);

    return (
        <PageTemplate>
            <h1>Test Timer</h1>
            <p>passedTime: {getPassedTime()} ms</p>
            <p>frameCount: {getFrameCount()}</p>
            <p>isRunning: {isRunning ? 'true' : 'false'}</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
            }}>
                <Button onClick={_start} variant="contained">Start</Button>
                <Button onClick={_stop} variant="contained">Stop</Button>
                <Button onClick={reset} variant="contained">Reset</Button>
            </Box>
        </PageTemplate>
    );
}
