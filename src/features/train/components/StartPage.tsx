import { SxProps } from "@mui/system";
import { Box, Grid } from "@mui/material";
import UserList from "../../user/components/UserList";
import { useEffect, useState } from "react";
import IUser from "../../user/interfaces/IUser";
import { useDependency } from "../../../general/contexts/DependencyContext";
import IFetchUsers from "../../user/interfaces/IFetchUsers";
import PageTemplate from "../../../general/components/PageTemplate";

interface StartPageProps {
    sx?: SxProps;
}
export default function StartPage({ sx }: StartPageProps) {
    const hook = useStartPage();

    return (
        <PageTemplate className="train-start-page" sx={sx}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={10}>
                    <UserList users={hook.users} onSelectUser={hook.onSelectUser} sx={{ height: "80%" }} />
                </Grid>
            </Grid>
        </PageTemplate>
    );
}

export function useStartPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const { useFetchUsers } = useDependency();
    const fetchUsers: IFetchUsers = useFetchUsers();

    useEffect(() => {
        fetchUsers
            .fetch()
            .then((res) => {
                setUsers(res!.users);
            })
            .catch((error) => {
                console.log(error);
            });    
    }, []);

    function onSelectUser(user: IUser) {
        console.log(user);
    }

    return {
        users,
        onSelectUser,
    }
}
