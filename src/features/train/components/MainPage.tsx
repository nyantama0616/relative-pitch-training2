import { SxProps } from "@mui/system";
import { Box, Grid } from "@mui/material";
import UserList from "../../user/components/UserList";
import { useEffect, useState, useRef } from "react";
import { useDependency } from "../../../general/contexts/DependencyContext";
import PageTemplate from "../../../general/components/PageTemplate";
import { useAuth } from "../../auth/contexts/AuthContext";
import IQuestion from "../interfaces/IQuestion";
import DurationBar from "./DurationBar";

interface TrainPageProps {
    sx?: SxProps;
}
export default function TrainPage({ sx }: TrainPageProps) {
    const hook = useTrainPage();

    useEffect(() => {
        hook.start();
    }, []);

    return (
        <PageTemplate className="train-train-page" sx={sx}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{ height: "80%" }}>
                        {!hook.isRunning
                            ? <h1>{hook.counter}</h1>
                            : <DurationBar
                                duration={hook.dbps.duration}
                                startTime={hook.dbps.startTime!}
                                getPassedTime={hook.dbps.getPassedTime}
                                border={1000}
                            />
                        }
                    </Box>
                </Grid>
            </Grid>
        </PageTemplate>
    );
}

export function useTrainPage() {
    const { useTrainManager, useTimerManager, usePostTrainRecord } = useDependency();
    const timer = useTimerManager();
    const postTrainRecord = usePostTrainRecord();
    const trainManager = useTrainManager({
        timer,
        onFinished: (questions) => {
            console.log("finished");
            _save(questions);
        }
    });
    
    const { currentUser } = useAuth();

    const [counter, setCounter] = useState(1);

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
        intervalRef.current = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);
    }

    useEffect(() => {
        if (counter < 0) {
            trainManager.start();
            clearInterval(intervalRef.current!);
        }
    }, [counter]);

    return {
        isRunning: counter < 0,
        counter,
        start,
        currentQuestion: trainManager.currentQuestion,
        dbps: { // duration bar props
            duration,
            startTime: trainManager.currentQuestion?.startTime,
            getPassedTime: timer.getPassedTime
        }
    }
}
