import { useDependency } from "../../../general/contexts/DependencyContext";
import IFetchQuestionnaireTemplateRequest from "../interfaces/IFetchQuestionnaireTemplateRequest";
import IFetchQuestionnaireTemplateResponse from "../interfaces/IFetchQuestionnaireTemplateResponse";
import IFetchQuestionnaireTemplate from "../interfaces/IFetchQuestionnaireTemplate";
import requests from "../../../general/requests";

export default function useFetchQuestionnaireTemplate(): IFetchQuestionnaireTemplate {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<IFetchQuestionnaireTemplateRequest, IFetchQuestionnaireTemplateResponse>();

    function fetch(questionnaireName: string) {
        return new Promise<IFetchQuestionnaireTemplateResponse | null>((resolve, reject) => {
            requestManager
                .get(requests.questionnaire.fetchTemplate(questionnaireName))
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    return {
        status: requestManager.status,
        fetch,
    }
}
