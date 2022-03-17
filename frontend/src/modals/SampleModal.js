import React from "react";
import axios from "axios";
import "../css/modal.css";

const SampleModal = (props) => {
  const { showSampleModal, setShowSampleModal, methods } = props;

  if (!showSampleModal) {
    return null;
  }

  const { handleSubmit } = methods;

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
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // add send request
    sendRequest(data.sample);
    setShowSampleModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-body">
          <label htmlFor="sample_request">
            <h1>
              <b>Paste JSON file</b>
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
        </div>
      </div>
    </div>
  );
};

export default SampleModal;
