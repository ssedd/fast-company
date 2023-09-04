import React, { useState } from "react";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content || ""}
          onChange={handleChange}
          name="content"
          label="Сообщение"
          error={errors.content}
        />
        <div className="d-flex justify-contnt-end">
          <button type="submit" className="btn btn-primary w-100 mx-auto m-3">
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
