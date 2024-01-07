import BasicStatus from "../../../general/types/BasicStatus";
import IFetchQuestionnaireTemplateResponse from "./IFetchQuestionnaireTemplateResponse";

export default interface IFetchQuestionnaireTemplate {
    status: BasicStatus;
    fetch(questionnaireName: string): Promise<IFetchQuestionnaireTemplateResponse | null>;
}
