import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import requests from "../../general/requests";

interface HomePageProps {
    sx?: SxProps;
}
export default function TestRequestPage({ sx }: HomePageProps) {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager();
    const { useFetchUsers, useSignIn, useFetchIntervalRates } = useDependency();
    const fetchUsers = useFetchUsers();
    const signIn = useSignIn();
    const fetchIntervalRates = useFetchIntervalRates();
    
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

    function _signIn() {
        signIn
            .signIn("test@example.com", "pass")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function _fetchIntervalRates() {
        fetchIntervalRates
            .fetch(1)
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
            <Box>
                <h1>Sign In</h1>
                <Button variant="contained" onClick={_signIn}>Submit</Button>
            </Box>
            <Box>
                <h1>Fetch Interval Rates</h1>
                <Button variant="contained" onClick={_fetchIntervalRates}>Submit</Button>
            </Box>
        </PageTemplate>
    )
}
