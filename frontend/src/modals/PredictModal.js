import React, { useState } from "react";
import axios from "axios";
import Spinner from "../css/Spinner";
import PredictForm from "./PredictForm";
import "../css/modal.css";

const PredictModal = (props) => {
  const { showPredictModal, setShowPredictModal, methods } = props;
  const { handleSubmit, resetField } = methods;
  const [sentRequest, setSentRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState();

  const keysArray = [
    "CompanyId",
    "BankEntryDate",
    "BankEntryText",
    "BankEntryAmount",
  ];

  const sendRequest = async (data) => {
    try {
      const config = {
        method: "post",
        data: data,
        url: "http://localhost:5000/predict",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios(config);
      console.log(result);
      setSentRequest(false);
      setRequestSuccess(true);
    } catch (error) {
      console.log(error);
      setSentRequest(false);
      setRequestSuccess(false);
    }
  };

  const onSubmit = (data) => {
    setSentRequest(true);
    sendRequest(data.predict);
  };

  const onClose = () => {
    keysArray.map((id) => {
      resetField(`predict.${id}`);
    });
    setRequestSuccess();
    setShowPredictModal(false);
  };

  if (!showPredictModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-body">
          <h1>
            <b>Fill in form</b>
          </h1>
        </div>
        <div className="row" style={{ paddingBottom: "30px" }}>
          {keysArray.map((keyArr) => (
            <PredictForm key={keyArr} id={keyArr} methods={methods} />
          ))}
        </div>
        <div className="row">
          {sentRequest && <Spinner />}
          {requestSuccess === true && "Success"}
          {requestSuccess === false && "Something went wrong..."}
        </div>
        <div
          className="modal-footer"
          style={{
            display: "flex",
            float: "right",
          }}
        >
          <button
            className="btn btn-lg btn-primary"
            onClick={handleSubmit(onSubmit)}
            type="button"
          >
            Send data to predict
          </button>
          <button
            className="btn btn-lg"
            onClick={() => onClose()}
            disabled={false}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictModal;
