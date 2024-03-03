import BasicStatus from "../../../general/types/BasicStatus";

interface IShimamura {
    onStart: () => void;
    onReset: () => void;
    status: BasicStatus;
}

export default IShimamura;
