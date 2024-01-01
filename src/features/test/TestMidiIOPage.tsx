import { Box } from "@mui/material";
import PageTemplate from "../../general/components/PageTemplate";
import IKeyPressManager from "../../general/interfaces/IKeyPressManager";
import { useDependency } from "../../general/contexts/DependencyContext";
import { useEffect } from "react";

export default function TestSoundPage() {
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
                <Main keyPressManager={keyPressManager} />
            </Box>
        </PageTemplate>
    );
}

interface MainProps {
    keyPressManager: IKeyPressManager
}
function Main({ keyPressManager }: MainProps) {
    const { useMidiIOWithKeyPress, useSoundPlayerWithTone } = useDependency();
    const midiIO = useMidiIOWithKeyPress(keyPressManager);
    const soundPlayer = useSoundPlayerWithTone();

    useEffect(() => {
        if (midiIO.inputMessage?.type === "On") {
            console.log("play!", midiIO.inputMessage.note);
            soundPlayer.playNote(midiIO.inputMessage.note, 500);
        }
    }, [midiIO.inputMessage]);

    return (
        <Box>
            <h2>Input Message</h2>
            <p>type: {midiIO.inputMessage?.type}</p>
            <p>note: {midiIO.inputMessage?.note}</p>
        </Box>
    );

}
