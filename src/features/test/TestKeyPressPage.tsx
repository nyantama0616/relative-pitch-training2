import { Box } from "@mui/material";
import PageTemplate from "../../general/components/PageTemplate";
import IKeyPressManager from "../../general/interfaces/IKeyPressManager";
import { useDependency } from "../../general/contexts/DependencyContext";

export default function TestKeyPressPage() {
    const { useKeyPressManager } = useDependency();
    const keyPressManager = useKeyPressManager();

    return (
        <PageTemplate className="test-key-press">
            <h1>Key Press Test</h1>
            <Box
                tabIndex={0}
                onKeyDown={e => keyPressManager.handleKeyDown(e)}
                onKeyUp={e => keyPressManager.handleKeyUp(e)}
            >
                <Main hook={keyPressManager} />
            </Box>
        </PageTemplate>
    );
}

interface MainProps {
    hook: IKeyPressManager
}
function Main({ hook }: MainProps) {
    return (
        <Box>
            <h2>Key Down Info</h2>
            <p>count: {hook.keyDownInfo.count}</p>
            <p>key: {hook.keyDownInfo.key}</p>

            <br/>

            <h2>Key Up Info</h2>
            <p>count: {hook.keyUpInfo.count}</p>
            <p>key: {hook.keyUpInfo.key}</p>
        </Box>
    );

}
