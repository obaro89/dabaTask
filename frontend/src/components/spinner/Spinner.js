import React from "react";
import { SpinnerRoundFilled } from "spinners-react";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="loading">
      <SpinnerRoundFilled color="#aa54db" size="150px" thickness={300} />
    </div>
  );
};

export default Spinner;
