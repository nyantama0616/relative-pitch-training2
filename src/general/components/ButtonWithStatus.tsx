import BasicStatus from "../types/BasicStatus";
import { Button, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

interface ButtonWithStatusProps {
    status: BasicStatus;
    onClick: () => void;
    sx?: SxProps;
    normalText?: string;
    loadingText?: string;
    errorText?: string;
    successText?: string;
    submittable?: boolean;
}

function ButtonWithStatus({ status, onClick, sx, normalText, loadingText, errorText, successText, submittable=true }: ButtonWithStatusProps) {
    const normalButton = (
        <Button variant="contained" onClick={onClick} sx={sx} disabled={!submittable}>
            <Typography>
                {normalText || "normal"}
            </Typography>
        </Button>
    );

    const loadingButton = (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" disabled sx={sx} color="info">
                <Typography>
                    {loadingText || "loading"}
                </Typography>
            </Button>
            <Box>
                <CircularProgress color="info" size={20} />
            </Box>
        </Box>
    );

    const errorButton = (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" onClick={onClick} sx={sx}>
                <Typography>
                    {errorText || "error"}
                </Typography>
            </Button>
            <Box>
                <CancelIcon color="error" />
            </Box>
        </Box>
    );

    const successButton = (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" disabled sx={sx} color="success">
                <Typography>
                    {successText || "success"}
                </Typography>
            </Button>
            <Box>
                <CheckCircleIcon color="success" />
            </Box>
        </Box>
        
    );

    return (
            status === BasicStatus.Doing ? loadingButton :
                status === BasicStatus.Failed ? errorButton :
                    status === BasicStatus.Success ? successButton :
                        normalButton
    )
}

export default ButtonWithStatus;
