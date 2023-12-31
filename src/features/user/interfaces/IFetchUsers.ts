import BasicStatus from "../../../general/types/BasicStatus";
import IUser from "./IUser";
import FetchUsersResponse from "../types/FetchUsersResponse";

export default interface IFetchUsers {
    status: BasicStatus;
    users: IUser[];
    fetch(): Promise<FetchUsersResponse | null>;
}
