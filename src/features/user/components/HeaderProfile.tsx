import { Box, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import ProfileImage from "./ProfileImage";
import { useAuth } from "../../auth/contexts/AuthContext";
import { useEffect } from "react";
import requests from "../../../general/requests";

interface HeaderProfileProps {
    sx?: SxProps;
}
export default function HeaderProfile({ sx }: HeaderProfileProps) {
    const auth = useAuth();

    //TODO: 消す
    useEffect(() => {
        auth.signIn("test@example.com", "pass");
    }, []);

    const user = auth.currentUser;
    if (!user) return null;

    const textColor = "white";
    return (
        //TODO: 画像のアスペクト1/1にしたい
        //TODO: 色々レイアウトおかしい
        // <Box  className="header-profile" sx={{ backgroundColor: "#333333", ...sx, color: textColor }}>
        <Box  className="header-profile" sx={{ ...sx, color: textColor }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ProfileImage image_url={requests.fetchImage(user.imagePath)} sx={{ height: "auto", width: "70px" }} />
                </Grid>
                <Grid item xs={2}>
                    <p>{user.userName || "no name"}</p>
                </Grid>
                <Grid item xs={6}>
                    <p>{user.email}</p>
                </Grid>
            </Grid>
        </Box>
    )
}
