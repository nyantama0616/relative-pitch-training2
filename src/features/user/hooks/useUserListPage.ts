import { useAuth } from "../../auth/contexts/AuthContext"
import IUser from "../interfaces/IUser";
import IUserListPage from "../interfaces/IUserListPage";

function useUserListPage(): IUserListPage {
    const auth = useAuth();

    function onSelectUser(user: IUser) {
        auth.signIn(user.email, "pass");
    }

    return {
        onSelectUser
    };
}

export default useUserListPage;
