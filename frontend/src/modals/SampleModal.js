import React from "react";
import axios from "axios";
import "../css/modal.css";

const SampleModal = (props) => {
  const { showSampleModal, setShowSampleModal, methods, setSampleResponse } =
    props;

  if (!showSampleModal) {
    return null;
  }

  const { handleSubmit, resetField } = methods;

  const sendRequest = async (data) => {
    try {
      const config = {
        method: "post",
        data: data,
        url: "http://localhost:5000/sample",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios(config);
      setSampleResponse({
        status: "success",
        message: result.data,
      });
    } catch (error) {
      setSampleResponse({
        status: "danger",
        message: error.response.data,
      });
    }
  };

  const onSubmit = (data) => {
    sendRequest(data.sample);
    resetField("sample");
    setShowSampleModal(false);
  };

  const onClose = () => {
    resetField("sample");
    setShowSampleModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-body">
          <label htmlFor="sample_request">
            <h1>
              <b>Paste data in JSON form (array of objects)</b>
            </h1>
          </label>
          <textarea
            id="sample_request"
            rows={15}
            {...methods.register("sample", {
              required: true,
            })}
          />
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
            disabled={false}
            type="button"
          >
            Add Sample to Dataset
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

export default SampleModal;
