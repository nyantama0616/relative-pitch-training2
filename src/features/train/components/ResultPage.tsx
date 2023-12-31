import { SxProps } from "@mui/system";
import { Box, Grid } from "@mui/material";
import PageTemplate from "../../../general/components/PageTemplate";
import { useDependency } from "../../../general/contexts/DependencyContext";
import { useState, useEffect } from "react";
import ResultGraph from "./ResultGraph";

interface ResultPageProps {
    sx?: SxProps;
}
export default function ResultPage({ sx }: ResultPageProps) {
    const hook = useResultPage();

    return (
        <PageTemplate sx={{ ...sx }}>
            <ResultGraph
                prevMissRates={hook.prevIntervalRates.missRates}
                currentMissRates={hook.currentIntervalRates.missRates}
                prevAverageReactionRates={hook.prevIntervalRates.averageReactionRates}
                currentAverageReactionRates={hook.currentIntervalRates.averageReactionRates}
                sx={{ height: "50%" }}
            />
        </PageTemplate>
    );
}

interface IntervalRates {
    missRates: number[],
    averageReactionRates: number[]
}
function useResultPage() {
    const [prevIntervalRates, setPrevIntervalRates] = useState<IntervalRates>({ missRates: [], averageReactionRates: [] });
    const [currentIntervalRates, setCurrentIntervalRates] = useState<IntervalRates>({ missRates: [], averageReactionRates: [] });

    const { useFetchIntervalRates } = useDependency();
    const fetchPrevIntervalRates = useFetchIntervalRates();
    const fetchCurrentIntervalRates = useFetchIntervalRates();

    useEffect(() => {
        fetchPrevIntervalRates
            .fetch(1)
            .then((res) => {
                // setPrevIntervalRates(res!.intervalRates);
                setPrevIntervalRates({
                    missRates: res!.intervalRates.missRates.map(missRate => missRate - 0.1),
                    averageReactionRates: res!.intervalRates.averageReactionRates.map(averageReactionRate => averageReactionRate - 100)
                });
            })
            .catch((error) => {
                console.log(error);
            });
        
        fetchCurrentIntervalRates
            .fetch(1)
            .then((res) => {
                setCurrentIntervalRates(res!.intervalRates);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return {
        prevIntervalRates,
        currentIntervalRates,
    }
}
