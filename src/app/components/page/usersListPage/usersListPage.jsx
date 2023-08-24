import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Loading from "../../../layouts/loading";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProffesions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const pageSize = 8;

  const { users } = useUser();

  const handleDelete = (userId) => {
    console.log(userId);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProffesions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const toggleDeleteSearchQuery = () => {
    setSearchQuery("");
  };

  if (users) {
    const filtredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;

    const count = filtredUsers.length;
    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button onClick={clearFilter} className="btn btn-secondary mt-2">
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <div className="input-group mb-3">
            <input
              name="searchQuery"
              type="text"
              placeholder="Введите имя..."
              id="search-text"
              onChange={handleSearchQuery}
              value={searchQuery}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={toggleDeleteSearchQuery}
            >
              {<i className="bi bi-x-circle"></i>}
            </button>
          </div>

          {count > 0 && (
            <UserTable
              users={userCrop}
              onDelete={handleDelete}
              onSort={handleSort}
              selectedSort={sortBy}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return <Loading />;
};

UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
