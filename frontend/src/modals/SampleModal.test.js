import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import SampleModal from "./SampleModal";
import RenderWithFormProvider from "../functions/RenderWithFormProvider";

const setShowSampleModal = jest.fn();
const setSampleResponse = jest.fn();

describe("test suite for Predict Modal component", () => {
  it("test loaded component", async () => {
    render(
      <RenderWithFormProvider>
        <SampleModal
          showSampleModal
          setShowSampleModal={setShowSampleModal}
          setSampleResponse={setSampleResponse}
        />
      </RenderWithFormProvider>
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
      <RenderWithFormProvider>
        <SampleModal
          showSampleModal={false}
          setShowSampleModal={setShowSampleModal}
          setSampleResponse={setSampleResponse}
        />
      </RenderWithFormProvider>
    );

    const button = screen.queryByText("Add Sample to Dataset");
    expect(button).not.toBeInTheDocument();
  });

  it("test send sample request - success", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("http://localhost:5000/sample").reply(200, "Success");

    render(
      <RenderWithFormProvider>
        <SampleModal
          showSampleModal
          setShowSampleModal={setShowSampleModal}
          setSampleResponse={setSampleResponse}
        />
      </RenderWithFormProvider>
    );

    const button = screen.queryByText("Add Sample to Dataset");
    const textarea = screen.getByRole("textbox");
    userEvent.type(textarea, "test");

    await waitFor(() => {
      expect(textarea).toHaveValue("test");
      fireEvent.click(button);
    });

    expect(setSampleResponse).toHaveBeenCalledWith({
      message: "Success",
      status: "success",
    });
  });

  it("test send sample request - failed", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("http://localhost:5000/sample").reply(400, "Error");

    render(
      <RenderWithFormProvider>
        <SampleModal
          showSampleModal
          setShowSampleModal={setShowSampleModal}
          setSampleResponse={setSampleResponse}
        />
      </RenderWithFormProvider>
    );

    const button = screen.queryByText("Add Sample to Dataset");
    const textarea = screen.getByRole("textbox");
    userEvent.type(textarea, "test");

    await waitFor(() => {
      expect(textarea).toHaveValue("test");
      fireEvent.click(button);
    });

    expect(setSampleResponse).toHaveBeenCalledWith({
      message: "Error",
      status: "danger",
    });
  });
});
