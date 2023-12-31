import { Box, List } from "@mui/material";
import { SxProps } from "@mui/system";
import IUser from "../interfaces/IUser";
import UserListItem from "./UserListItem";

interface UserListProps {
    users: IUser[];
    onSelectUser: (user: IUser) => void;
    sx?: SxProps;
}
export default function UserList({ users, onSelectUser, sx }: UserListProps) {
    const items = users.map((user, i) => <UserListItem key={i.toString()} user={user} onClick={() => { onSelectUser(user) }} />);

    return (
        <Box sx={{ ...sx, overflowY: "scroll" }}>
            <List>
                {items}
            </List>
        </Box>
    );
}
