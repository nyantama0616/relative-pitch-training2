import React from "react";
import PageTemplate from "../../../general/components/PageTemplate";
import UserList from "../components/UserList";
import useUserListPage from "../hooks/useUserListPage";
import useFetchUsers from "../hooks/useFetchUsers";
import { useEffect } from "react";

function UserListPage() {
    const hook = useUserListPage();
    const { users, fetch } = useFetchUsers();

    useEffect(() => {
        fetch();
    }, []);

    return (
        <PageTemplate>
            <h1>ユーザ一覧</h1>
            <h3>ユーザを選択してください</h3>
            <UserList onSelectUser={hook.onSelectUser} users={users} />
        </PageTemplate>
    )
}


export default UserListPage;
