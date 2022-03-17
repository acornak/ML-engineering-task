import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PredictModal from "./PredictModal";

const setShowPredictModal = jest.fn();

describe("test suite for Predict Modal component", () => {
  it("test loaded component", () => {
    render(
      <PredictModal
        showPredictModal
        setShowPredictModal={setShowPredictModal}
      />
    );

    // const modalHeader = screen.getByText("")
    // expect(modalHeader).toBeInTheDocument()

    const button = screen.getByText("Send data to predict");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(setShowPredictModal).toHaveBeenCalledWith(false);
  });

  it("test closed modal", () => {
    render(
      <PredictModal
        showPredictModal={false}
        setShowPredictModal={setShowPredictModal}
      />
    );

    const button = screen.queryByText("Send data to predict");
    expect(button).not.toBeInTheDocument();
  });
});
