import PageTemplate from "../../general/components/PageTemplate";
import { Box, Grid, Button, Paper } from "@mui/material";
import IQuestion from "../train/interfaces/IQuestion";
import IKeyPush from "../train/interfaces/IKeyPush";

import { SxProps } from "@mui/system";
import { useDependency } from "../../general/contexts/DependencyContext";
import getNoteName from "../sounds/lib/getNoteName";

export default function TestTrainManager() {
    const { useTrainManager } = useDependency();
    const trainManager = useTrainManager();

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
    }

    return (
        <PageTemplate>
            <h1>Test Train Manager</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>Current Question</h2>
                    {/* <Question question={trainManager.currentQuestion} /> */}
                    <Question question={mockQuestion} />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                    }}>
                        <Button onClick={trainManager.start} variant="contained">Start</Button>
                        <Button onClick={trainManager.stop} variant="contained">Stop</Button>
                        <Button onClick={trainManager.reset} variant="contained">Reset</Button>
                    </Box>
                </Grid>
            </Grid>
        </PageTemplate>
    );
}

interface QuestionProps {
    question: IQuestion | null,
    sx?: SxProps
}
function Question({ question, sx }: QuestionProps) {
    if (question === null) return (<></>);

    const keyPushes = question.keyPushes.map((keyPush, i) => {
        return <KeyPush key={i.toString()} keyPush={keyPush} sx={{ width: "50px" }} />
    });

    return (
        <Box sx={{ ...sx }}>
            <h3>Interval</h3>
            <p>note0: {getNoteName(question.interval.note0)}</p>
            <p>note1: {getNoteName(question.interval.note1)}</p>
            
            <br />

            <h3>Start Time</h3>
            <p>{question.startTime}</p>

            <br />

            <h3>Key Pushes</h3>
            <Box sx={{ display: "flex", gap: 1 }}>
                {keyPushes}
            </Box>
        </Box>
    );
}

interface KeyPushProps {
    keyPush: IKeyPush,
    sx?: SxProps
}
function KeyPush({ keyPush, sx }: KeyPushProps) {
    const label = `${keyPush.time} ms\n${keyPush.note}`;

    return (
        <Paper sx={sx}>
            <p>{keyPush.time}</p>
            <p>{getNoteName(keyPush.note)}</p>
        </Paper>
    );
}
