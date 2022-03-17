import React from "react";
import { render, screen } from "@testing-library/react";
import Greetings from "./Greetings";

describe("test suite for Greetings component", () => {
  it("test loaded component", () => {
    render(<Greetings />);

    const greeting = screen.getByText("Hi John!");
    const deascr = screen.getByText(
      "What a beautiful day to start some predictions, isn't it?!"
    );

    expect(greeting).toBeInTheDocument();
    expect(deascr).toBeInTheDocument();
  });
});
