import IQuestion from "../interfaces/IQuestion";

type PostTrainRecordRequest = {
    userId: number,
    questions: IQuestion[],
}

export default PostTrainRecordRequest;
