import { Box, List, ListItem, Select, MenuItem, SelectChangeEvent, FormControl, Grid, Typography, FormGroup, Checkbox } from '@mui/material';
import { SxProps } from '@mui/system';
import IFormQuestionnaire from '../interfaces/IFormQuestionnaire';
import { IQuestionnaireItem } from '../interfaces/IQuestionnaire';
import Remarks from './Remarks';

interface FormQuestionnaireProps {
    hook: IFormQuestionnaire;
    sx?: SxProps;
}
export default function FormQuestionnaire({ hook, sx }: FormQuestionnaireProps) {
    const formItems = hook.items.map((item, index) => {
        return (
            <ListItem key={index}>
                <FormControl>
                    <Typography variant="h6">{index + 1}. {item.content}</Typography>
                    {item.maxSelectNum > 1
                        ? <FormGroup>
                            {_getOptions(item).map((option, index2) => {
                                return (
                                    <Grid container key={index2}>
                                        <Grid item xs={1}>
                                            <Checkbox
                                                name={item.id.toString()}
                                                value={option}
                                                onChange={_handleChange}
                                                checked={hook.answers[item.id] ? (hook.answers[item.id]?.answer as boolean[])[index2] : false}
                                            />
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Typography variant="body1" lineHeight="42px">
                                                {option}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </FormGroup>

                        : <Select
                            name={item.id.toString()}
                            value={hook.answers[item.id]?.answer as string || ""}
                            onChange={_handleChange}
                        >
                            {_getOptions(item).map((option, index) => {
                                return (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                )
                            })}
                        </Select>
                    }
                    <Remarks itemId={item.id} onChange={hook.handleChangeRemarks} content={hook.answers[item.id]?.remarks || ""} />
                </FormControl>
            </ListItem>
        );
    });

    function _handleChange(event: SelectChangeEvent) {
        const value = event.target.value as string;
        const id = parseInt(event.target.name);
        hook.handleChangeItem(id, value);
    }

    function _getOptions(item: IQuestionnaireItem) {
        return item.answer.split(", ");
    }

    return (
        <Box>
            <List>
                {formItems}
            </List>
        </Box>
    )
}
