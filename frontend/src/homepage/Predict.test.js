import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Predict from "./Predict";

const setShowPredictModal = jest.fn();

describe("test suite for Predict component", () => {
  it("test loaded component", () => {
    render(<Predict setShowPredictModal={setShowPredictModal} />);

    const header = screen.getByText("Let's make prediction happen!");
    const description = screen.getByText(
      "Click on the button to fill out data needed for model to predict desired values."
    );

    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
  it("test show Predict Modal", () => {
    render(<Predict setShowPredictModal={setShowPredictModal} />);

    const button = screen.getByText("Add Data for Prediction");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(setShowPredictModal).toHaveBeenCalled();
  });
});
