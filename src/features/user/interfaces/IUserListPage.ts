import IUser from "./IUser";

interface IUserListPage {
    onSelectUser: (user: IUser) => void;
}

export default IUserListPage;
