import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import PredictModal from "./PredictModal";
import RenderWithFormProvider from "../functions/RenderWithFormProvider";

const setShowPredictModal = jest.fn();

describe("test suite for Predict Modal component", () => {
  it("test loaded component", () => {
    render(
      <RenderWithFormProvider>
        <PredictModal
          showPredictModal
          setShowPredictModal={setShowPredictModal}
        />
      </RenderWithFormProvider>
    );

    const modalHeader = screen.getByText("Fill in form");
    expect(modalHeader).toBeInTheDocument();

    const inputFields = screen.queryAllByRole("textbox");
    expect(inputFields).toHaveLength(4);

    const button = screen.getByText("Close");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(setShowPredictModal).toHaveBeenCalledWith(false);
  });

  it("test closed modal", () => {
    render(
      <RenderWithFormProvider>
        <PredictModal
          showPredictModal={false}
          setShowPredictModal={setShowPredictModal}
        />
      </RenderWithFormProvider>
    );

    const button = screen.queryByText("Send data to predict");
    expect(button).not.toBeInTheDocument();
  });

  it("test predict request - success", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("http://localhost:5000/predict").reply(200, {
      status: "Success",
    });

    render(
      <RenderWithFormProvider>
        <PredictModal
          showPredictModal
          setShowPredictModal={setShowPredictModal}
        />
      </RenderWithFormProvider>
    );

    const inputFields = screen.queryAllByRole("textbox");
    inputFields.map((inputField) => {
      userEvent.type(inputField, "test");
    });

    const button = screen.getByText("Send data to predict");
    expect(button).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(button);
    });

    const success = screen.getByText("Success");
    expect(success).toBeInTheDocument();
  });

  it("test predict request - error", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost("http://localhost:5000/predict").reply(400, {
      status: "Error",
    });

    render(
      <RenderWithFormProvider>
        <PredictModal
          showPredictModal
          setShowPredictModal={setShowPredictModal}
        />
      </RenderWithFormProvider>
    );

    const inputFields = screen.queryAllByRole("textbox");
    inputFields.map((inputField) => {
      userEvent.type(inputField, "test");
    });

    const button = screen.getByText("Send data to predict");
    expect(button).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(button);
    });

    const success = screen.getByText("Something went wrong...");
    expect(success).toBeInTheDocument();
  });
});
