import { Box, Button, Typography, Grid } from "@mui/material";
import PageTemplate from "../../../general/components/PageTemplate";
import useShimamura from "../hooks/useShimamura";
import BasicStatus from "../../../general/types/BasicStatus";
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ShimamuraPage() {
    const hook = useShimamura();

    const startButton = (
        <Button
            variant="contained"
            color="primary"
            onClick={hook.onStart}
        >
            スタート
        </Button>
    )

    const resetButton = (
        <Button
            variant="contained"
            color="warning"
            onClick={hook.onReset}
        >
            リセット
        </Button>
    )

    const startComponent = (
        <Box>
            <Typography>
                トレーニング前
            </Typography>
        </Box>
    )

    const doingComponent = (
        <Box>
            <Typography>
                トレーニング中...
            </Typography>
            <CircularProgress />
        </Box>
    )

    const doneComponent = (
        <Box>
            <Typography>
                おつかれさまでしたぁ！！<br/>
                トレーニング完了！
            </Typography>
            <CheckCircleIcon color="success"/>
        </Box>
    )

    return (
        <PageTemplate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">島村楽器式トレーニング</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography>
                        ボタンを押すとタイマーが開始するので、トレーニングを始めてください。<br/>
                        約10分間経過すると、終了の音が出るので、トレーニングを終了してください。
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    {hook.status === BasicStatus.Idle && startComponent}
                    {hook.status === BasicStatus.Doing && doingComponent}
                    {hook.status === BasicStatus.Success && doneComponent}
                </Grid>

                <Grid item xs={12}>
                    <Box>
                        {hook.status === BasicStatus.Idle && startButton}
                        {hook.status === BasicStatus.Doing && resetButton}
                    </Box>
                </Grid>
            </Grid>


        </PageTemplate>
    )
}

export default ShimamuraPage;
