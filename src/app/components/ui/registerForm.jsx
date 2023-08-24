import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });

  const { signUp } = useAuth();
  const { qualities } = useQualities();
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));
  const [errors, setErrors] = useState({});
  const { professions } = useProfession();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обзязательна для заполнения"
      },
      isEmail: {
        message: "Email введен неккоректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обзязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль ненадежен! Добавьте заглавную букву"
      },
      isContainDigit: {
        message: "Пароль ненадежен! Добавьте цифры"
      },
      min: {
        message: "Минимальная длинна пароля 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно для заполнения!"
      }
    },
    licence: {
      isRequired: {
        message: "Подтвердите лицензионное соглашение"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        name="profession"
        label="Выберите профессию"
        defaultOption="Выбор профессии"
        options={professionsList}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
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
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>{" "}
      </CheckBoxField>

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
