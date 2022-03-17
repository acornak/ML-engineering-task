import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainNavigation from "./MainNavigation";

describe("test suite for Main Navigation component", () => {
  it("test loaded navbar", () => {
    render(<MainNavigation />);

    const navbar = screen.getByText("Visma.net Online Learning App");
    expect(navbar).toBeInTheDocument();

    const userEmail = screen.getByText("example@example.com");
    expect(userEmail).toBeInTheDocument();

    const navHandler = screen.getByText("User").closest("li");
    expect(navHandler).not.toHaveClass("dropdown user-dropdown icon open");
  });

  it("test toggle navbar", () => {
    render(<MainNavigation />);

    const navHandler = screen.getByText("User");
    fireEvent.click(navHandler);

    expect(navHandler.closest("li")).toHaveClass(
      "dropdown user-dropdown icon open"
    );
  });
});
