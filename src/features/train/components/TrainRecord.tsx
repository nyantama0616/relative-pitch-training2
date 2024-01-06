import { Box, Paper, SxProps, List, ListItem } from "@mui/material";
import IQuestion from "../interfaces/IQuestion";
import IKeyPush from "../interfaces/IKeyPush";
import getNoteName from "../../sounds/lib/getNoteName";
import ITrainRecord from "../interfaces/ITrainRecord";

interface TrainRecordProps {
    trainRecord: ITrainRecord
}
export default function TrainRecord({ trainRecord }: TrainRecordProps) {    
    const questionComponents = trainRecord.questions.map((question, i) => {
        return <ListItem key={i.toString()}>
            <Box>
                <h2>Question {i + 1}</h2>
                <Question question={question} />
            </Box>
        </ListItem>
    });

    return (
        <Box>
            <h1>Train Record</h1>
            <h2>Record Id: {trainRecord.id}</h2>
            <h2>User Id: {trainRecord.userId}</h2>
            <List>
                {questionComponents}
            </List>
        </Box>
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
