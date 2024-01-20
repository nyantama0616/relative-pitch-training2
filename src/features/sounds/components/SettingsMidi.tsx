import { Box, List, ListItemButton, Grid, Button, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import IMidiIO from "../interfaces/IMidiIO";
import { useState } from "react";

interface State {
    selectableInput: boolean;
    selectableOutput: boolean;
}

interface SettingsMidiProps {
    midiIO: IMidiIO;
    sx?: SxProps;
}
export default function SettingsMidi({ midiIO, sx }: SettingsMidiProps) {
    const { availableInputDevices, availableOutputDevices, setInput, setOutput, currentInputDevice, currentOutputDevice } = midiIO;
    const [state, setState] = useState<State>({ selectableInput: false, selectableOutput: false });

    return (
        <Box sx={{ backgroundColor: "#dcfcfd", ...sx }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={7}>
                    <Typography variant="h6">
                        Input MIDI Device
                    </Typography>
                    <SelectableComponent items={availableInputDevices} currentItem={currentInputDevice} onSelect={(item) => {setInput(item)}} />
                </Grid>
                
                <Grid item xs={7}>
                    <Typography variant="h6">
                        Output MIDI Device
                    </Typography>
                    <SelectableComponent items={availableOutputDevices} currentItem={currentOutputDevice} onSelect={(item) => {setOutput(item)}} />
                </Grid>
            </Grid>
        </Box>
    );
}

interface SelectableComponentProps {
    items: string[];
    currentItem: string;
    onSelect: (item: string) => void;
    sx?: SxProps;
}
function SelectableComponent({ items, currentItem, onSelect, sx }: SelectableComponentProps) {
    const [showList, setShowList] = useState<boolean>(false);

    const listItems = items.map((item, index) => {
        return (
            <ListItemButton
                key={index}
                onClick={() => {
                    onSelect(item)
                    setShowList(false);
                }
            }>
                {item}
            </ListItemButton>
        );
    });

    return (
        <>
            {showList ?
                <List>
                    {listItems}
                </List>
                :
                <Button
                    onClick={() => setShowList(true)}
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                >
                    {currentItem || "No Device"}
                </Button>
            }
        </>
    )
}
