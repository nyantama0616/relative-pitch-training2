import Chart from "react-apexcharts";
import {Box} from "@mui/material";
import { SxProps } from "@mui/system";
import { useEffect, useRef, useState } from "react";

interface DurationBarProps {
    duration: number | null,
    startTime: number,
    getPassedTime: () => number,
    border: number,
    sx?: SxProps
}
export default function DurationBar({ duration, startTime, getPassedTime, border, sx }: DurationBarProps) {
    const _duration = duration !== null ? duration : getPassedTime() - startTime; //TODO: できればdurationを外部から渡したい

    const color = _duration < border ? "rgb(4, 190, 4)" : 'rgb(249, 67, 67)';
    const series = [
        {
            name: "Temperature in Fahrenheit", //will be displayed on the y-axis
            data: [0, _duration, 0]
        }
    ];
    const options = {
        chart: {
            id: "simple-bar",
        },
        yaxis: {
            min: 0,
            max: border,
            title: {
                    text: "反応時間(ms)",
                    style: {
                        fontSize: "20px",
                    }
                },
        },
        xaxis: {
            categories: ["", "", ""]
        },
        fill: {
            colors: [color]
        },
    };

    // TODO: もう少しスマートに更新する方法があるはず
    // 30fpsで更新する
    const [, forceUpdate] = useState({});
    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate({});
        }, 25);

        return () => clearInterval(interval);
    }, [])

    return (
        <Box  sx={{...sx}}>
            <Chart options={options} series={series} type="bar" height={450} />
        </Box>
    )
}
