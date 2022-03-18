import React from "react";
import { Alert } from "@vismaux/react-nc4";

const AlertHandler = (props) => {
  const { sampleResponse } = props;

  if (Object.keys(sampleResponse).length === 0) {
    return null;
  }

  return (
    <div className="modal-alert">
      <Alert type={sampleResponse.status}>{sampleResponse.message}</Alert>
    </div>
  );
};

export default AlertHandler;
