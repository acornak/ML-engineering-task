import React from "react";
import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Monitor from "./Monitor";

describe("test suite for Predict component", () => {
  it("test loaded component - successful request", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:5000/monitor").reply(200, "Error");

    render(<Monitor />);

    const header = screen.getByText("Analyse model accuracy");
    const spinnerElement = screen.getByTestId("spinner-element");

    expect(spinnerElement).toBeInTheDocument();

    const error = await screen.findByText("Total nr samples:");

    expect(header).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });

  it("test loaded component - failed request", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:5000/monitor").reply(400, "Error");

    render(<Monitor />);

    const header = screen.getByText(
      "Analyse model accuracy (most recent 1000 samples)"
    );
    const spinnerElement = screen.getByTestId("spinner-element");

    expect(spinnerElement).toBeInTheDocument();

    const error = await screen.findByText("Error message:");

    expect(header).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });
});
