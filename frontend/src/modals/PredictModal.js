import React, { useState } from "react";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import Spinner from "../css/Spinner";
import PredictForm from "./PredictForm";
import "../css/modal.css";

const PredictModal = (props) => {
  const { showPredictModal, setShowPredictModal } = props;
  const [sentRequest, setSentRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState();
  const [predictedValue, setPredictedValue] = useState();
  const [requestError, setRequestError] = useState();
  const methods = useFormContext();

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
      setPredictedValue(result.data[0]);
      setSentRequest(false);
      setRequestSuccess(true);
    } catch (error) {
      setSentRequest(false);
      setRequestSuccess(false);
      setRequestError(error.response.data);
    }
  };

  const onSubmit = (data) => {
    setSentRequest(true);
    setRequestSuccess();
    sendRequest(data.predict);
  };

  const onClose = () => {
    setShowPredictModal(false);
    keysArray.map((id) => {
      methods.resetField(`predict.${id}`);
    });
    setRequestSuccess();
  };

  if (!showPredictModal) {
    return null;
  }

  const predicted = () => {
    return (
      <div>
        <h3>
          <b>Predicted AccountNumber: {predictedValue}</b>
        </h3>
      </div>
    );
  };

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
          {requestSuccess === true && predicted()}
          {requestSuccess === false && (
            <div>
              <h3>Something went wrong... Try again later.</h3>
              Error message: {requestError}
            </div>
          )}
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
            onClick={methods.handleSubmit(onSubmit)}
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
