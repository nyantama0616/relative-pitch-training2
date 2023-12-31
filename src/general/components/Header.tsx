import { Typography } from "@mui/material";
import HeaderProfile from "../../features/user/components/HeaderProfile";
interface HeaderProps {
    height: string;
}
export default function Header({ height }: HeaderProps) {
    return (
        <header style={{ backgroundColor: "black", height: height, display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: "white", textAlign: "left", ml: 1, height: "40px", lineHeight: "40px" }}>
                Relative Pitch Trainer
            </Typography>
            <HeaderProfile
                sx={{
                    ml: "auto",
                    mr: 1,
                    mt: 1,
                    mb: 1,
                }}
            />
        </header>
    )
}
