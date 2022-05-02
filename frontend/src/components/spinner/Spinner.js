import React from "react";
import { SpinnerCircular } from "spinners-react";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="loading">
      <SpinnerCircular color="#828282" size="150px" thickness={300} />
    </div>
  );
};

export default Spinner;
