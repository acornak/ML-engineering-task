import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("test suite for spinner component", () => {
  it("testing spinner component", () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId("spinner-element");
    expect(spinnerElement).toBeInTheDocument();
  });
});
