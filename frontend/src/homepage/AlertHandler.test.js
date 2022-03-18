import React from "react";
import { render, screen } from "@testing-library/react";
import AlertHandler from "./AlertHandler";

describe("test suite for Alert Handler component", () => {
  it("test loaded alert", () => {
    const sampleResponse = {
      status: "success",
      message: "Success",
    };

    render(<AlertHandler sampleResponse={sampleResponse} />);

    const message = screen.getByText(sampleResponse.message);
    expect(message).toBeInTheDocument();
  });
  it("test hidden alert", () => {
    const sampleResponse = {};

    const { container } = render(
      <AlertHandler sampleResponse={sampleResponse} />
    );

    expect(container.firstChild).toBeNull();
  });
});
