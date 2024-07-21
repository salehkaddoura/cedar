import { describe, expect, test} from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PaymentForm } from "../PaymentForm";

describe("PaymentForm", () => {
  /**
   * None of the components are currently fetching data from a backend so the
   * data is static, if there was a backend, we would mock the API call here and pass
   * the data to the component which should then render the Correct customer name
   * and the correct total.
   */
  test("renders payment form with correct fields", () => {
    render(<PaymentForm handleNext={() => {}} />);
    expect(screen.getByText("Card Number")).toBeDefined();
    expect(screen.getByText("Expires (MM/YY)")).toBeDefined();
    expect(screen.getByText("Security Code (CVV)")).toBeDefined();
    expect(screen.getByText("Name on card")).toBeDefined();
    expect(screen.getByText("Zip Code")).toBeDefined();
  });

  test("shows error message if card number field is invalid", () => {
    const { getByText, getByLabelText, getAllByText } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Card Number");

    act(() => {
      fireEvent.change(inputField, { target: { value: "randomthings" } });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getAllByText("This field is required")).toBeDefined();
  });

  test("shows success if card number field is valid", () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Card Number");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "1212 1212 1212 1212" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getByTestId("success-icon")).toBeDefined();
  });

  test("shows error message if expiry date field is invalid", () => {
    const { getByText, getByLabelText, getAllByText } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Expires (MM/YY)");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "randomthings" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getAllByText("This field is required")).toBeDefined();
  });

  test("shows success if expiry date field is valid", () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Expires (MM/YY)");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "09/27" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getByTestId("success-icon")).toBeDefined();
  });

  test("shows error message if security code field is invalid", () => {
    const { getByText, getByLabelText, getAllByText } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Security Code (CVV)");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "randomthings" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getAllByText("This field is required")).toBeDefined();
  });

  test("shows success if security code field is valid", () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Security Code (CVV)");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "212" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getByTestId("success-icon")).toBeDefined();
  });

  test("shows error message if card name field is invalid", () => {
    const { getByText, getByLabelText, getAllByText } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Name on card");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "sk" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getAllByText("This field is required")).toBeDefined();
  });

  test("shows success if card name field is valid", () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Name on card");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "Saleh Kaddoura" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getByTestId("success-icon")).toBeDefined();
  });

  test("shows error message if zip code field is invalid", () => {
    const { getByText, getByLabelText, getAllByText } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Zip Code");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "sk" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getAllByText("This field is required")).toBeDefined();
  });

  test("shows success if card name field is valid", () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const inputField = getByLabelText("Zip Code");

    act(() => {
      fireEvent.change(inputField, {
        target: { value: "94061" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getByTestId("success-icon")).toBeDefined();
  });

  test("if all fields are valid show review and pay", () => {
    const { getByText, getByLabelText } = render(
      <PaymentForm handleNext={() => {}} />
    );

    const cardNumberField = getByLabelText("Card Number");
    const expiryDate = getByLabelText("Expires (MM/YY)");
    const nameField = getByLabelText("Name on card");
    const zipCodeField = getByLabelText("Zip Code");
    const securityCodeField = getByLabelText("Security Code (CVV)");

    act(() => {
      fireEvent.change(cardNumberField, {
        target: { value: "1212 1212 1212 1212" },
      });
      fireEvent.change(expiryDate, {
        target: { value: "09/27" },
      });
      fireEvent.change(securityCodeField, {
        target: { value: "212" },
      });
      fireEvent.change(nameField, {
        target: { value: "Saleh Kaddoura" },
      });
      fireEvent.change(zipCodeField, {
        target: { value: "94061" },
      });
      fireEvent.click(getByText(/Continue/i));
    });

    expect(getByText("Pay $600.00")).toBeDefined();
  });
});

