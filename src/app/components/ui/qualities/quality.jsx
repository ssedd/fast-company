import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
  const { getQualities } = useQualities();
  const { name, color, _id } = getQualities(id);
  return (
    <span className={"badge m-1 bg-" + color} key={_id}>
      {name}
    </span>
  );
};

Quality.propTypes = {
  id: PropTypes.string.isRequired
};

export default Quality;
