import { SxProps } from "@mui/system";
import { Box, Grid, Button, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDependency } from "../../../general/contexts/DependencyContext";
import PageTemplate from "../../../general/components/PageTemplate";
import { useAuth } from "../../auth/contexts/AuthContext";
import IQuestion from "../interfaces/IQuestion";
import DurationBar from "./DurationBar";
import SettingsMidi from "../../sounds/components/SettingsMidi";

interface TrainPageProps {
    isTest?: boolean;
    sx?: SxProps;
}
export default function TrainPage({ isTest = false, sx }: TrainPageProps) {
    const PRESENT_NUM_PER_NOTE = isTest ? 2 : 5;
    const title = isTest ? "Test" : "Training";

    const hook = useTrainPage(PRESENT_NUM_PER_NOTE);

    const beforeComponent = hook.isCounting ?
        <h1>{hook.counter}</h1>
        :
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <SettingsMidi midiIO={hook.midiIO} />
                </Grid>
                
                <Grid item xs={12}>
                    < Button variant = "contained" onClick = { hook.start } > スタート</Button>
                </Grid>
            </Grid>
        </Box>

    return (
        <PageTemplate className="train-train-page" sx={sx}>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {!hook.isRunning
                    ? beforeComponent
                    : <Box sx={{ height: "80%", width: "80%" }}>
                        <DurationBar
                            duration={hook.dbps.duration}
                            startTime={hook.dbps.startTime!}
                            getPassedTime={hook.dbps.getPassedTime}
                            border={1500}
                        />
                    </Box>
                }
            </Box>
        </PageTemplate>
    );
}

interface State {
    isCounting: boolean;
    counter: number;
}
export function useTrainPage(PRESENT_NUM_PER_NOTE: number) {
    const { useTrainManager, useTimerManager, usePostTrainRecord, useMidiIO } = useDependency();
    const timer = useTimerManager();
    const postTrainRecord = usePostTrainRecord();
    const midiIO = useMidiIO();
    const trainManager = useTrainManager({
        timer,
        midiIO,
        PRESENT_NUM_PER_NOTE,
        onFinished: (questions) => {
            console.log("finished");
            _save(questions);
        }
    });
    
    const { currentUser } = useAuth();

    const [state, setState] = useState<State>({
        isCounting: false,
        counter: 3,
    });

    const duration = !trainManager.isAnswerable && trainManager.prevScore !== null ? trainManager.prevScore.endTime - trainManager.prevScore.startTime : null;

    function _save(questions: IQuestion[]) {
        console.log("saving train record...");
        console.log(questions);
        
        postTrainRecord.post({
            userId: currentUser!.id,
            questions: questions,
        })
    }

    const intervalRef = useRef<NodeJS.Timer | null>(null);
    function start() {
        if (state.isCounting) return;
        setState((prev) => ({ ...prev, isCounting: true }));

        intervalRef.current = setInterval(() => {
            setState((prev) => ({ ...prev, counter: prev.counter - 1 }));
        }, 1000);
    }

    useEffect(() => {
        if (state.counter < 0) {
            trainManager.start();
            clearInterval(intervalRef.current!);
        }
    }, [state.counter]);

    return {
        isRunning: state.counter < 0,
        counter: state.counter,
        isCounting: state.isCounting,
        start,
        currentQuestion: trainManager.currentQuestion,
        dbps: { // duration bar props
            duration,
            startTime: trainManager.currentQuestion?.startTime,
            getPassedTime: timer.getPassedTime
        },
        midiIO,
    }
}
