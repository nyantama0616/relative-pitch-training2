import { IQuestionnaireItem } from "./IQuestionnaire";

export default interface IPostQuestionnaireRequest {
    questionnaireName: string;
    data: IQuestionnaireItem[];
    userId: number;
}
