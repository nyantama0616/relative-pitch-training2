import { Box, Button, TextField } from "@mui/material";
import { SxProps } from "@mui/system";
import { useState } from "react";

interface RemarksProps {
    itemId: number;
    content: string;
    onChange: (itemId: number, value: string) => void;
    sx?: SxProps;
}
export default function Remarks({ itemId, content, onChange, sx }: RemarksProps) {
    const [showContent, setShowContent] = useState(false);

    function _handleClick() {
        setShowContent(!showContent);
    }

    function _handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        onChange(itemId, value);
    }

    return (
        <Box>
            <Button onClick={_handleClick} variant="outlined">備考</Button>
            {showContent &&
                <TextField
                    multiline
                    rows={4}
                    value={content}
                    onChange={_handleChange}
                />
            }
        </Box>
    );
}
