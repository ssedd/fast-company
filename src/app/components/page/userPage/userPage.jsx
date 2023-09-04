import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Loading from "../../../layouts/loading";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);

  const history = useHistory();

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
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
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
