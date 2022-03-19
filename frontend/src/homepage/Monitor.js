import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../css/Spinner";

const Monitor = () => {
  const [response, setResponse] = useState();
  const [requestSuccess, setRequestSuccess] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const config = {
          method: "get",
          url: "http://localhost:5000/monitor",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const result = await axios(config);
        setResponse(result.data);
        setRequestSuccess(true);
      } catch (error) {
        setResponse(error.response.data);
        setRequestSuccess(false);
      }
    };

    sendRequest();
  }, []);

  return (
    <div className="container no-padding">
      <div className="panel" style={{ borderRadius: "12px" }}>
        <div className="panel-body">
          <h1 className="no-margin">
            <b>Analyse model accuracy</b>
          </h1>
          {!response && <Spinner />}
          {requestSuccess && (
            <div className="row" style={{ paddingTop: "25px" }}>
              <div className="col-lg-3">
                <b>Total nr samples:&nbsp;</b>
                {response.rows}
              </div>
              <div className="col-lg-3">
                <b>Metrics nr samples:&nbsp;</b> 1000
              </div>
              <div className="col-lg-3">
                <b>Precision Score:&nbsp;</b> {response.precision_score}
              </div>
              <div className="col-lg-3">
                <b>Recall Score:&nbsp;</b> {response.recall_score}
              </div>
            </div>
          )}
          {requestSuccess === false && (
            <>
              <b>Error message:&nbsp;</b> {response}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monitor;
