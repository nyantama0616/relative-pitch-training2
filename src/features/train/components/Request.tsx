import { Box, Typography, Button, Link } from "@mui/material";
import React from "react";
import { SxProps } from "@mui/system";
import BasicStatus from "../../../general/types/BasicStatus";
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface RequestProps {
    status: BasicStatus;
    onDownloadButtonClick?: () => void;
    downloadURL?: string;
    downloadFileName?: string;
    sx?: SxProps;
}

function Request({ status, onDownloadButtonClick, downloadFileName, downloadURL, sx }: RequestProps) {
    const downloadButton = (
        <Box>
            <Link href={downloadURL} download={downloadFileName} style={{ textDecoration: "none" }}>
                <Button variant="contained">
                    JSONファイルをダウンロード
                </Button>
            </Link>
        </Box>
    )

    const loading = (
        <Box>
            <Typography>
                トレーニング結果を送信しています...
            </Typography>
            <CircularProgress color="info" size={20} />
        </Box>
    );

    const success = (
        <Box>
            <Typography>
                お疲れ様です！<br/>
                トレーニング結果が正常に保存されました！
            </Typography>
            <CheckCircleIcon color="success" />
            {/* {downloadButton} */}
        </Box>
    );

    const error = (
        <Box>
            <Box>
                <Typography>
                    お疲れ様です！<br />
                </Typography>

                <Typography color="red">
                    トレーニング結果の保存に失敗しました（泣）<br/>
                </Typography>
                
                <Typography>
                    お手数ですが、jsonファイルをダウンロードして<br/>
                    管理人に送っていただけますでしょうか。。。
                </Typography>
                <CancelIcon color="error" />
                {downloadButton}
            </Box>
        </Box>
    );

    return (
        status === BasicStatus.Doing ? loading : status === BasicStatus.Success ? success : status === BasicStatus.Failed ? error : null
    );
}

export default Request;
