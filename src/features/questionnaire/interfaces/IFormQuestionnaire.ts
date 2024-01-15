import { IQuestionnaireItem } from "./IQuestionnaire";

export default interface IFormQuestionnaire {
    items: IQuestionnaireItem[];
    answers: Answers;
    handleChangeItem: (itemId: number, value: string) => void;
    handleChangeRemarks: (itemId: number, value: string) => void;
    handleReset: () => void;
    handleSubmit: () => void;
    isFullFilled(): boolean;
}

export interface Answers {
    [itemId: number]: {
        answer: string | boolean[];
        remarks: string;
    }
}
