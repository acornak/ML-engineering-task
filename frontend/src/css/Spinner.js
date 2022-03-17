import React from "react";
import styles from "../css/spinner.css";

const Spinner = (props) => {
  const { children } = props;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <span className="spinner spinner-default-blue" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto" data-testid="spinner-element">
          <h1 className={styles["spinner-body"]}>{children}</h1>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
