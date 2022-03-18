import React from "react";
import { Alert } from "@vismaux/react-nc4";

const AlertHandler = (props) => {
  const { sampleResponse } = props;

  if (Object.keys(sampleResponse).length === 0) {
    console.log(sampleResponse);
    return null;
  }

  return (
    <Alert type={sampleResponse.status} dismissible={true}>
      {sampleResponse.message}
    </Alert>
  );
};

export default AlertHandler;
