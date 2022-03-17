import React from "react";
import "../css/modal.css";

const PredictModal = (props) => {
  const { showPredictModal, setShowPredictModal } = props;

  if (!showPredictModal) {
    return null;
  }

  console.log(showPredictModal);

  return (
    <div className="modal">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-body"></div>
        <div
          className="modal-footer"
          style={{
            display: "flex",
            float: "right",
          }}
        >
          <button
            className="btn btn-lg btn-primary"
            onClick={() => {
              setShowPredictModal(false);
            }}
            type="button"
          >
            Send data to predict
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictModal;
