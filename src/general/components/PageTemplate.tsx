import { Box } from "@mui/material";
import { SxProps } from "@mui/system";

interface PageTemplateProps {
    className?: string;
    sx?: SxProps;
    children?: React.ReactNode;
}
export default function PageTemplate({ className, sx, children }: PageTemplateProps) {
    return (
        <Box className={className} sx={{ width: "100%", height: "100%", backgroundColor: "white", ...sx }}>
            {children}
        </Box>
    )
}
