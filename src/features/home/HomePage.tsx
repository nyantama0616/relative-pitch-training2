import { Grid, Box, List, ListItemButton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import PageTemplate from "../../general/components/PageTemplate";
import { Link } from "react-router-dom";

interface HomePageProps {
    sx?: SxProps;
}
export default function HomePage({ sx }: HomePageProps) {
    return (
        <PageTemplate className="home-page" sx={sx}>
            <h1>Home</h1>
            <Box sx={{ backgroundColor: "#fefefe" }}>
                <Grid>
                    <Typography variant="h5" textAlign="left">
                        アンケート
                    </Typography>

                    <List>
                        <Item title="属性を問うためのアンケート" to="questionnaire/attribute"/>
                        <Item title="音楽への興味を問うためのアンケート" to="questionnaire/interest"/>
                        <Item title="自己効力感を問うためのアンケート" to="questionnaire/self_efficacy"/>
                        <Item title="モチベーションを問うためのアンケート" to="questionnaire/motivation"/>
                    </List>
                </Grid>
                
                <Grid>
                    <Typography variant="h5" textAlign="left">
                        本システム
                    </Typography>

                    <List>
                        <Item title="相対音感テスト" to="train/test" />
                        <Item title="相対音感トレーニング" to="train/main" />
                    </List>
                </Grid>
            </Box>
        </PageTemplate>
    )
}

interface ItemProps {
    title: string;
    to: string
}
function Item({ title, to }: ItemProps) {
    return (
        <ListItemButton>
            <Link to={to} style={{textDecoration: "none", color: "black"}}>{title}</Link>
        </ListItemButton>
    )
}
