import { useEffect } from "react"
import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import FetchMeansResponse from "../train/types/FetchMeansResponse";
import { useState } from "react";
import { Box } from "@mui/material";
import ResultGraph from "../train/components/ResultGraph";

export default function TestFetchMeans() {
    const hook = useTestFetchMeans();    

    const graph = (
        hook.prevMeans && hook.currMeans? 
            <ResultGraph
                sx={{ width: "100%", height: "500px" }}
                prevMissRates={hook.prevMeans.missCount}
                prevAverageReactionRates={hook.prevMeans.reactionTime}
                currentMissRates={hook.currMeans.missCount}
                currentAverageReactionRates={hook.currMeans.reactionTime}
            /> :
            <Box>no data</Box>
    )
    return (
        <PageTemplate>
            <h1>Test Fetch Means</h1>
            {graph}
       </PageTemplate>
    )
}


function useTestFetchMeans() {
    const [prevResponse, setPrevResponse] = useState<FetchMeansResponse | null>(null);
    const [currResponse, setCurrResponse] = useState<FetchMeansResponse | null>(null);

    const { useFetchMeans } = useDependency();
    const fetchMeans = useFetchMeans();

    useEffect(() => {
        fetchMeans.fetch(111)
            .then((res) => {
                console.log(res);
                setPrevResponse(res);
            })
            .catch((error) => {
                console.log(error);
            });
        
        fetchMeans.fetch(128)
            .then((res) => {
                console.log(res);
                setCurrResponse(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const prevMeans = prevResponse?.means || null;
    const currMeans = currResponse?.means || null;
    
    return {
        prevMeans,
        currMeans,
    }
}
