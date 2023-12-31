import { Box, ListItemButton, ListItemText } from "@mui/material";
import IUser from "../interfaces/IUser";

interface UserListItemProps {
    user: IUser;
    onClick: (user: IUser) => void;
}
export default function UserListItem({ user, onClick }: UserListItemProps) {
    return (
        <ListItemButton onClick={() => { onClick(user) }}>
            <ListItemText primary={user.email} />
        </ListItemButton>
    )
}
