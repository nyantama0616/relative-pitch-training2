import ISignIn from "../interfaces/ISignIn";
import { useDependency } from "../../../general/contexts/DependencyContext";
import requests from "../../../general/requests";
import SignInRequest from "../types/SignInRequest";
import SignInResponse from "../types/SignInResponse";

export default function useSignIn(): ISignIn {
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<SignInRequest, SignInResponse>();

    function signIn(email: string, password: string): Promise<SignInResponse | null> {
        return new Promise<SignInResponse | null>((resolve, reject) => {
            requestManager
                .post(requests.auth.signIn, { email, password })
                .then(res => {
                    resolve(res);
                })
                .catch(() => {
                    reject(null);
                });
        }); 
    }

    return {
        status: requestManager.status,
        signIn
    };
}
