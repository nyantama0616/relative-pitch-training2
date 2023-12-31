import { Box, Grid } from "@mui/material";
import Header from "./Header";

interface LayoutProps {
    children?: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    return (
        <Box className="layout" sx={{ width: "100%", height: "100%", background: "#cccccc", display: "flex", flexDirection: "column" }} >
            <Header height="80px" />
            <Box className="main" sx={{ width: "100%", height: "100%", background: "#cccccc", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <Box
                            className="temp"
                            sx={{
                                width: "100%",
                                height: "1000px", //TODO: 100%とかにしたい
                                display: "grid",
                                gridTemplateColumns: "minmax(250px, 2fr) minmax(600px, 3fr) minmax(250px, 2fr)",
                                gap: "10px",
                            }}
                        >
                            <Box sx={{gridColumn: 2}}>
                                {children}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
