import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sample from "./Sample";

const setShowSampleModal = jest.fn();
const setSampleResponse = jest.fn();

describe("test suite for Sample component", () => {
  it("test loaded component", () => {
    render(
      <Sample
        setShowSampleModal={setShowSampleModal}
        setSampleResponse={setSampleResponse}
      />
    );

    const header = screen.getByText("Make the model Great Again!");
    const description = screen.getByText(
      "Start by uploading another sample to train the model and get even more precise results."
    );

    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
  it("test show Sample Modal", () => {
    render(
      <Sample
        setShowSampleModal={setShowSampleModal}
        setSampleResponse={setSampleResponse}
      />
    );

    const button = screen.getByText("Add Sample");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(setShowSampleModal).toHaveBeenCalled();
  });
});
