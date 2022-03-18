import React from "react";
import { render, screen } from "@testing-library/react";
import Monitor from "./Monitor";

describe("test suite for Predict component", () => {
  it("test loaded component", () => {
    render(<Monitor />);

    const header = screen.getByText("Analyse model accuracy");
    const description = screen.getByText("Not enough data to evaluate model!");

    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
