import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import { Button, Box } from "@mui/material";
import { useEffect } from "react";

export default function TestTimer() {
    const { useTimerManager } = useDependency();
    const { start, stop, reset, passedTime, isRunning, frameCount } = useTimerManager();

    return (
        <PageTemplate>
            <h1>Test Timer</h1>
            <p>passedTime: {passedTime} ms</p>
            <p>frameCount: {frameCount}</p>
            <p>isRunning: {isRunning ? 'true' : 'false'}</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
            }}>
                <Button onClick={start} variant="contained">Start</Button>
                <Button onClick={stop} variant="contained">Stop</Button>
                <Button onClick={reset} variant="contained">Reset</Button>
            </Box>
        </PageTemplate>
    );
}
