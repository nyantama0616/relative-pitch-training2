import { Box, SxProps } from "@mui/material";
import Chart from "react-apexcharts";

const missRateText = "誤答率(%)";
const averageReactionRateText = "平均反応時間(ms)";
const intervalText = "音程";
const goalText = "前回の値";
const graphTitle = "各音程の誤答率と平均反応時間のグラフ";
const intervals = ["CD↑", "CE↑", "CF↑", "CG↑", "CA↑", "CB↑", "CB↓", "CA↓", "CG↓", "CF↓", "CE↓", "CD↓"]; //propsはこれに対応している必要がある

const labelSize = "20px";


interface ResultGraphProps {
    prevMissRates: number[];
    prevAverageReactionRates: number[];
    currentMissRates: number[];
    currentAverageReactionRates: number[];
    sx?: SxProps;
}

export default function ResultGraph({ prevMissRates, prevAverageReactionRates, currentMissRates, currentAverageReactionRates, sx }: ResultGraphProps) {
    const prevMissRates100 = prevMissRates.map(missRate => missRate * 100); //誤答率をパーセントにする
    const missRates100 = currentMissRates.map(missRate => missRate * 100); //誤答率をパーセントにする

    const maxMissRate100 = Math.max(Math.max(...missRates100), Math.max(...prevMissRates100)); //誤答率の最大値
    const maxAverageReactionRate = Math.max(Math.max(...currentAverageReactionRates), Math.max(...prevAverageReactionRates)); //平均反応時間の最大値

    const series: ApexAxisChartSeries = [
        {
            name: missRateText,
            data: missRates100.map((y, i) => {
                return {
                    x: intervals[i],
                    y: y,
                    goals: [
                        {
                            name: goalText,
                            value: prevMissRates100[i],
                            strokeWidth: 16,
                            strokeHeight: 5,
                            strokeColor: "#ff0000"
                        }
                    ]
                }
            }),
        },
        {
            name: averageReactionRateText,
            data: currentAverageReactionRates.map((y, i) => {
                return {
                    x: intervals[i],
                    y: y,
                    goals: [
                        {
                            name: goalText,
                            value: prevAverageReactionRates[i],
                            strokeWidth: 16,
                            strokeHeight: 5,
                            strokeColor: "#ff0000"
                        }
                    ]
                }
            }),
        },
    ];

    const options: ApexCharts.ApexOptions = { //型大事！プロパティがミスってるとコンパイラがエラー吐いてくれる！
        title: {
            text: graphTitle,
            align: "center",
            style: {
                fontSize: "26px",
            }
        },
        colors: ["#aaaaff", "#88ff88"],

        xaxis: {
            categories: intervals,
            title: {
                text: intervalText,
                style: {
                    fontSize: labelSize,
                }
            },
        },
        yaxis: [
            {
                title: {
                    text: missRateText,
                    style: {
                        fontSize: labelSize,
                    }
                },
                max: maxMissRate100,
                decimalsInFloat: 4
            },
            {
                opposite: true,
                title: {
                    text: averageReactionRateText,
                    style: {
                        fontSize: labelSize,
                    }
                },
                max: maxAverageReactionRate,

                decimalsInFloat: 0
            },
        ],
        dataLabels: {
            enabled: false
        },
    };

    return (
        <Box sx={sx}>
            <Chart
                type="bar"
                width="100%"
                height="100%"
                series={series}
                options={options}
                />
        </Box>
    )
}
