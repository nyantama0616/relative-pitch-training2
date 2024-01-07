import BasicStatus from "../../../general/types/BasicStatus";
import IPostQuestionnaireRequest from "./IPostQuestionnaireRequest";

export default interface IPostQuestionnaire {
    status: BasicStatus;
    post(params: IPostQuestionnaireRequest): Promise<null>;
}
