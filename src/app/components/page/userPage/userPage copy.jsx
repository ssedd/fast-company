import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { useHistory } from "react-router-dom";
import Loading from "../../../layouts/loading";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleClickBack = () => {
    history.replace("/users");
  };
  const handleClickEdit = () => {
    history.replace(history.location.pathname + "/edit");
  };

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p> completedMeetings: {user.completedMeetings} </p>
        <h2> rate: {user.rate} </h2>
        <div>
          <button onClick={handleClickBack}>
            Вернуться ко всем пользователям
          </button>
          <button onClick={handleClickEdit}>Изменить</button>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
