import { SxProps } from "@mui/system";
import { Box, Grid, Button } from "@mui/material";
import UserList from "../../user/components/UserList";
import { useEffect, useState } from "react";
import IUser from "../../user/interfaces/IUser";
import { useDependency } from "../../../general/contexts/DependencyContext";
import IFetchUsers from "../../user/interfaces/IFetchUsers";
import PageTemplate from "../../../general/components/PageTemplate";
import { useAuth } from "../../auth/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface StartPageProps {
    sx?: SxProps;
}
export default function StartPage({ sx }: StartPageProps) {
    const hook = useStartPage();

    return (
        <PageTemplate className="train-start-page" sx={sx}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={10}>
                    <h2>ユーザを選択してね</h2>
                </Grid>
                
                <Grid item xs={10}>
                    <UserList users={hook.users} onSelectUser={hook.onSelectUser} sx={{ height: "500px" }} />
                </Grid>

                <Grid item xs={10}>
                    <Button variant="contained" onClick={hook.finish}>次へ</Button>
                </Grid>
            </Grid>
        </PageTemplate>
    );
}

export function useStartPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    
    const { useFetchUsers } = useDependency();
    const fetchUsers: IFetchUsers = useFetchUsers();

    const auth = useAuth();

    const navigate = useNavigate();

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
        auth.signIn(user.email, "pass");
    }

    function finish() {
        navigate("/train/questionnaire");
    }

    return {
        users,
        onSelectUser,
        finish,
    }
}
