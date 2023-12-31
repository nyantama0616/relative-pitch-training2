import { useDependency } from "../../../general/contexts/DependencyContext";
import IFetchUsers from "../interfaces/IFetchUsers";
import FetchUsersRequest from "../types/FetchUsersRequest";
import FetchUsersResponse from "../types/FetchUsersResponse";
import requests from "../../../general/requests";
import { useState } from "react";
import IUser from "../interfaces/IUser";

export default function useFetchUsers(): IFetchUsers {
    const [users, setUsers] = useState<IUser[]>([]);
    const { useRequestManager } = useDependency();
    const requestManager = useRequestManager<FetchUsersRequest, FetchUsersResponse>();

    async function fetch() {
        return new Promise<FetchUsersResponse | null>((resolve, reject) => {
            requestManager
                .get(requests.fetchUsers)
                .then((res) => {
                    setUsers(res!.users);
                    resolve(res!);
                })
                .catch((error) => {
                    reject();
                });
        });
    }

    return {
        status: requestManager.status,
        users,
        fetch,
    };
}
