import React from "react";

const Predict = (props) => {
  const { setShowPredictModal } = props;

  return (
    <div className="container no-padding">
      <div className="panel" style={{ borderRadius: "12px" }}>
        <div className="panel-body">
          <h1 className="no-margin" style={{ paddingBottom: "15px" }}>
            <b>Let's make prediction happen!</b>
          </h1>
          Click on the button to fill out data needed for model to predict
          desired values.
          <div className="row float-right">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setShowPredictModal(true)}
            >
              Add Data for Prediction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
