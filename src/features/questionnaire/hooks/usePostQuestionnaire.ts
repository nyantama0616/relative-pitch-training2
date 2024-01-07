import { useDependency } from "../../../general/contexts/DependencyContext";
import IPostQuestionnaireRequest from "../interfaces/IPostQuestionnaireRequest";
import IPostQuestionnaire from "../interfaces/IPostQuestionnaire";
import requests from "../../../general/requests";

export default function usePostQuestionnaire(): IPostQuestionnaire {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<IPostQuestionnaireRequest, null>();

    function post(params: IPostQuestionnaireRequest) {
        console.log(params);
        
        return new Promise<null>((resolve, reject) => {
            requestManager
                .post(requests.questionnaire.post, params)
                .then(response => {
                    resolve(null);
                })
                .catch(error => {
                    console.log(error.response);
                    
                    reject(error);
                });
        });
    }

    return {
        status: requestManager.status,
        post,
    }
}
