import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import { Button } from "@mui/material";
import { useEffect } from "react";

export default function TestTimer() {
    const { useTimerManager } = useDependency();
    const { start, stop, reset, passedTime, isRunning } = useTimerManager();

    return (
        <PageTemplate>
            <h1>Test Timer</h1>
            <p>passedTime: {passedTime} ms</p>
            <p>isRunning: {isRunning ? 'true' : 'false'}</p>
            <Button onClick={start} variant="contained">Start</Button>
            <Button onClick={stop} variant="contained">Stop</Button>
            <Button onClick={reset} variant="contained">Reset</Button>
        </PageTemplate>
    );
}
