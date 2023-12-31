import { Avatar } from "@mui/material";
import { SxProps } from "@mui/system";

interface ProfileImageProps {
    image_url: string;
    sx?: SxProps;
}
export default function ProfileImage({ image_url, sx }: ProfileImageProps) {
    return (
        <Avatar
            src={image_url}
            sx={{...sx}}
        />
    )
}
