import { Box } from "@mui/material";
import PageTemplate from "../../general/components/PageTemplate";
import { KeyPressProvider, useKeyPress } from "../../general/contexts/KeyPressContext";

export default function TestKeyPressPage() {
    return (
        <PageTemplate className="test-key-press">
            <h1>Key Press Test</h1>
            <KeyPressProvider>
                <Main />
        </KeyPressProvider>
        </PageTemplate>
    );
}

function Main() {
    const { keyDownInfo, keyUpInfo } = useKeyPress();

    return (
        <Box>
            <h2>Key Down Info</h2>
            <p>count: {keyDownInfo.count}</p>
            <p>key: {keyDownInfo.key}</p>

            <br/>

            <h2>Key Up Info</h2>
            <p>count: {keyUpInfo.count}</p>
            <p>key: {keyUpInfo.key}</p>
        </Box>
    );

}
