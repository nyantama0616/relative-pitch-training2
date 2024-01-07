export default interface IQuestionnaire {
    id: number;
    questionnaireName: string;
    data: IQuestionnaireItem[];
    userId: number;
    createdAt: string;
}

export interface IQuestionnaireItem {
    id: number;
    content: string;
    answer: string;
    maxSelectNum: number;
    remark: string;
}
