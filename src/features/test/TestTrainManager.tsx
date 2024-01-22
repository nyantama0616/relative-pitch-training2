import PageTemplate from "../../general/components/PageTemplate";
import { Box, Grid, Button, Paper, List, ListItem } from "@mui/material";
import IQuestion from "../train/interfaces/IQuestion";
import IKeyPush from "../train/interfaces/IKeyPush";
import DurationBar from "../train/components/DurationBar";
import SettingsMidi from "../sounds/components/SettingsMidi";

import { SxProps } from "@mui/system";
import { useDependency } from "../../general/contexts/DependencyContext";
import getNoteName from "../sounds/lib/getNoteName";
import { KeyPressProvider } from "../../general/contexts/KeyPressContext";
import { useAuth } from "../auth/contexts/AuthContext";

export default function TestTrainManager() {
    return <PageTemplate>
        <h1>Test Train Manager</h1>
        <KeyPressProvider>
            <Main />
        </KeyPressProvider>
    </PageTemplate>
}

function Main() {
    const { useTrainManager, useTimerManager, usePostTrainRecord, useMidiIO } = useDependency();
    const { currentUser } = useAuth();
    const timer = useTimerManager();
    const postTrainRecord = usePostTrainRecord();
    const midiIO = useMidiIO();
    const trainManager = useTrainManager({
        timer,
        midiIO,
        onFinished: (questions: IQuestion[]) => {
            console.log("finished");
            postTrainRecord.post({
                userId: currentUser!.id,
                questions: questions,
            })
        }
    });

    const answeredQuestions = trainManager.answeredQuestions.map((question, i) => {
        return <ListItem key={i.toString()}>
            <Box>
                <h2>Question {i + 1}</h2>
                <Question question={question} />
            </Box>
        </ListItem>
    });

    const duration = !trainManager.isAnswerable && trainManager.prevScore !== null ? trainManager.prevScore.endTime - trainManager.prevScore.startTime : null;
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SettingsMidi midiIO={midiIO}/>
            </Grid>

            <Grid item xs={12}>
                <h2>Current Question</h2>
                <Question question={trainManager.currentQuestion} />
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

            {/* <Grid item xs={12}>
                {
                    trainManager.currentQuestion === null
                        ? null
                        : <DurationBar duration={duration} startTime={trainManager.currentQuestion.startTime} getPassedTime={timer.getPassedTime} border={2000} />
                }
            </Grid> */}

            <Grid item xs={12}>
                <Box sx={{
                    height: "800px",
                    overflow: "scroll",
                }}>
                    <List>
                        {answeredQuestions}
                    </List>
                </Box>
            </Grid>
        </Grid>
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
