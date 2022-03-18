import React from "react";

const Monitor = () => {
  // add request to /monitor endpoint

  return (
    <div className="container no-padding">
      <div className="panel" style={{ borderRadius: "12px" }}>
        <div className="panel-body">
          <h1 className="no-margin">
            <b>Analyse model accuracy</b>
          </h1>
          Not enough data to evaluate model!
          <div className="row float-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
