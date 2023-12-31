import { Box, Button } from "@mui/material";
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
    const { useFetchUsers } = useDependency();
    const fetchUsers = useFetchUsers();
    
    function _ping() {
        requestManager
            .get(requests.devs.ping)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function _fetchUsers() {
        fetchUsers
            .fetch()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <PageTemplate className="test-ping-page" sx={sx}>
            <Box>
                <h1>Ping</h1>
                <Button variant="contained" onClick={_ping}>Submit</Button>
            </Box>
            <Box>
                <h1>Fetch Users</h1>
                <Button variant="contained" onClick={_fetchUsers}>Submit</Button>
            </Box>
        </PageTemplate>
    )
}
