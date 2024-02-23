import { Box, SxProps } from "@mui/material";
import Chart from "react-apexcharts";

const missRateText = "平均ミス回数";
const averageReactionRateText = "平均反応時間(ms)";
const intervalText = "音程";
const goalText = "前回の値";
// const graphTitle = "平均ミス回数と平均反応時間のグラフ";
const graphTitle = "平均反応時間のグラフ";
const intervals = ["CD↓", "CE↓", "CF↓", "CG↓", "CA↓", "CB↓", "CD↑", "CE↑", "CF↑", "CG↑", "CA↑", "CB↑"]; //propsはこれに対応している必要がある

const labelSize = "20px";


interface ResultGraphProps {
    prevMissRates: number[];
    prevAverageReactionRates: number[];
    currentMissRates: number[];
    currentAverageReactionRates: number[];
    sx?: SxProps;
}

export default function ResultGraph({ prevMissRates, prevAverageReactionRates, currentMissRates, currentAverageReactionRates, sx }: ResultGraphProps) {

    const maxMissRate = Math.max(Math.max(...currentMissRates), Math.max(...prevMissRates)); //平均ミス回数の最大値
    const maxAverageReactionRate = Math.max(Math.max(...currentAverageReactionRates), Math.max(...prevAverageReactionRates)); //平均反応時間の最大値

    const series: ApexAxisChartSeries = [
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
                            strokeWidth: 24,
                            strokeHeight: 5,
                            strokeColor: "#ff0000"
                        }
                    ]
                }
            }),
        },
        // {
        //     name: missRateText,
        //     data: currentMissRates.map((y, i) => {
        //         return {
        //             x: intervals[i],
        //             y: y,
        //             goals: [
        //                 {
        //                     name: goalText,
        //                     value: prevMissRates[i],
        //                     strokeWidth: 12,
        //                     strokeHeight: 5,
        //                     strokeColor: "#ff0000"
        //                 }
        //             ]
        //         }
        //     }),
        // },
    ];

    const options: ApexCharts.ApexOptions = { //型大事！プロパティがミスってるとコンパイラがエラー吐いてくれる！
        title: {
            text: graphTitle,
            align: "center",
            style: {
                fontSize: "26px",
            }
        },
        colors: ["#88ff88", "#aaaaff"],

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
                    text: averageReactionRateText,
                    style: {
                        fontSize: labelSize,
                    }
                },
                max: maxAverageReactionRate,

                decimalsInFloat: 0
            },
            // {
            //     opposite: true,
            //     title: {
            //         text: missRateText,
            //         style: {
            //             fontSize: labelSize,
            //         }
            //     },
            //     max: maxMissRate,
            //     decimalsInFloat: 4
            // },
            
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
