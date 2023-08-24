import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

import { useHistory } from "react-router-dom";
import Loading from "../../../layouts/loading";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  const history = useHistory();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleClickBack = () => {
    history.replace("/users");
  };

  if (user) {
    return (
      <div className="container">
        <button className="btn btn-primary" onClick={handleClickBack}>
          Назад
        </button>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            <Comments />
          </div>
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
