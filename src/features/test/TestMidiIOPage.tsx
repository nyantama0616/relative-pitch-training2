import { Box } from "@mui/material";
import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import { useEffect } from "react";
import { KeyPressProvider } from "../../general/contexts/KeyPressContext";

export default function TestSoundPage() {
    const { useKeyPressManager } = useDependency();
    const keyPressManager = useKeyPressManager();

    return (
        <PageTemplate className="test-key-press">
            <h1>MidiIO Test</h1>
            <KeyPressProvider>
                <Main />
            </KeyPressProvider>
        </PageTemplate>
    );
}

function Main() {
    const { useMidiIO, useSoundPlayerWithTone } = useDependency();
    const midiIO = useMidiIO();
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
