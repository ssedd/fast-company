import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import api from "../../../api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../../layouts/loading";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState([]);

  const handleClickBack = () => {
    history.replace(history.location.pathname - "/edit");
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
  };
  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }))
    );
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);
  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <SelectField
                name="profession"
                label="Выберите профессию"
                defaultOption="Выбор профессии"
                options={professions}
                onChange={handleChange}
                value={data.profession}
              />
              <RadioField
                label="Выберите пол"
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
              />
              <MultiSelectField
                defaultValue={data.qualities}
                label="Выберите качества"
                options={qualities}
                onChange={handleChange}
                name="qualities"
              />

              <button
                type="submit"
                className="btn btn-primary w-100 mx-auto m-1"
              >
                Обновить данные
              </button>

              <button
                className="btn btn-primary w-100 mx-auto m-1"
                onClick={handleClickBack}
              >
                Назад
              </button>
            </form>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
