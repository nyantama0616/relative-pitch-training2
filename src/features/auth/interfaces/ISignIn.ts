import BasicStatus from "../../../general/types/BasicStatus";
import SignInResponse from "../types/SignInResponse";

export default interface ISignIn {
    status: BasicStatus;
    signIn(email: string, password: string): Promise<SignInResponse | null>;
}
