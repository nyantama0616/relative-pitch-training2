import { Button } from "@mui/material";
import { SxProps } from "@mui/system";
import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import requests from "../../general/requests";

interface HomePageProps {
    sx?: SxProps;
}
export default function TestPingPage({ sx }: HomePageProps) {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager();
    
    function _handleClick() {
        requestManager
            .get(requests.devs.ping)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <PageTemplate className="test-ping-page" sx={sx}>
            <h1>Ping Test</h1>
            <Button variant="contained" onClick={_handleClick}>Submit</Button>
        </PageTemplate>
    )
}
