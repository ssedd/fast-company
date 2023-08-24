import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserPage from "../components/page/userPage/userPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  //   return <>{userId ? <UserPage /> : <UsersList />}</>;
  // return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};
export default Users;
