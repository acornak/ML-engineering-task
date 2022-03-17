import React from "react";
import { render, screen } from "@testing-library/react";
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

    const modalHeader = screen.getByText("Paste JSON file");
    expect(modalHeader).toBeInTheDocument();

    const button = screen.getByText("Add Sample to Dataset");
    expect(button).toBeInTheDocument();
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
