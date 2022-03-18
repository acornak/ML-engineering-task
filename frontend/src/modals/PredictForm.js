import React from "react";

const PredictForm = (props) => {
  const { methods, id } = props;

  return (
    <div className="col-lg-3">
      <label htmlFor={id}>
        <h3>
          <b>{id}</b>
        </h3>
      </label>
      <textarea
        id={id}
        {...methods.register(`predict.${id}`, {
          required: true,
        })}
      />
    </div>
  );
};

export default PredictForm;
