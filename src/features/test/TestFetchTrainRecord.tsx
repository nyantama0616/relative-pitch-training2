import TrainRecord from "../train/components/TrainRecord";
import { useDependency } from "../../general/contexts/DependencyContext";
import { useEffect, useState } from "react";
import ITrainRecord from "../train/interfaces/ITrainRecord";
import PageTemplate from "../../general/components/PageTemplate";

export default function TestFetchTrainRecord() {
    const { useFetchTrainRecord } = useDependency();
    const fetchTrainRecord = useFetchTrainRecord();

    const [trainRecord, setTrainRecord] = useState<ITrainRecord | null>(null);

    function _fetch() {
        fetchTrainRecord.fetch(-1).then(res => {
            if (res) {
                console.log(res);
                setTrainRecord(res.record);
            }
        });
    }

    useEffect(() => {
        _fetch();
    }, []);

    return (
        <PageTemplate>
            {trainRecord === null
                ? null
                : <TrainRecord trainRecord={trainRecord} />
            }
        </PageTemplate>
    );
}
