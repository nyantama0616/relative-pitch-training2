import { Box } from "@mui/material";
import PageTemplate from "../../general/components/PageTemplate";
import IKeyPressManager from "../../general/interfaces/IKeyPressManager";
import { useDependency } from "../../general/contexts/DependencyContext";

export default function TestMidiIOPage() {
    const { useKeyPressManager } = useDependency();
    const keyPressManager = useKeyPressManager();

    return (
        <PageTemplate className="test-key-press">
            <h1>MidiIO Test</h1>
            <Box
                tabIndex={0}
                onKeyDown={e => keyPressManager.handleKeyDown(e)}
                onKeyUp={e => keyPressManager.handleKeyUp(e)}
            >
                <TestMidiIOWithKeyPress keyPressManager={keyPressManager} />
            </Box>
        </PageTemplate>
    );
}

interface MainProps {
    keyPressManager: IKeyPressManager
}
function TestMidiIOWithKeyPress({ keyPressManager }: MainProps) {
    const { useMidiIOWithKeyPress } = useDependency();
    const midiIOWithKeyPress = useMidiIOWithKeyPress(keyPressManager);

    return (
        <Box>
            <h2>Input Message</h2>
            <p>type: {midiIOWithKeyPress.inputMessage?.type}</p>
            <p>note: {midiIOWithKeyPress.inputMessage?.note}</p>
        </Box>
    );

}
