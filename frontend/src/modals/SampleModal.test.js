import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SampleModal from "./SampleModal";

const setShowSampleModal = jest.fn();
const methods = {
  register: jest.fn(),
  handleSubmit: jest.fn(),
};

describe("test suite for Predict Modal component", () => {
  it("test loaded component", async () => {
    render(
      <SampleModal
        showSampleModal
        setShowSampleModal={setShowSampleModal}
        methods={methods}
      />
    );

    const modalHeader = screen.getByText(
      "Paste data in JSON form (array of objects)"
    );
    expect(modalHeader).toBeInTheDocument();

    const button = screen.getByText("Close");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(setShowSampleModal).toHaveBeenCalled();
  });

  it("test closed modal", () => {
    render(
      <SampleModal
        showSampleModal={false}
        setShowSampleModal={setShowSampleModal}
      />
    );

    const button = screen.queryByText("Add Sample to Dataset");
    expect(button).not.toBeInTheDocument();
  });
});
