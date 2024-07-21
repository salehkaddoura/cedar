import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { App } from "../App";

describe("E2E Payment Flow", () => {
  test("step through payment flow correctly", () => {
    render(<App />);
    expect(screen.getByText("Hi, Taylor")).toBeDefined();

    const welcomePageButton = screen.getByText(/pay total/i); 
    fireEvent.click(welcomePageButton);

    expect(screen.getByText("Card Number")).toBeDefined();
    expect(screen.getByText("Expires (MM/YY)")).toBeDefined();
    expect(screen.getByText("Security Code (CVV)")).toBeDefined();
    expect(screen.getByText("Name on card")).toBeDefined();
    expect(screen.getByText("Zip Code")).toBeDefined();

    const cardNumberField = screen.getByLabelText("Card Number");
    const expiryDate = screen.getByLabelText("Expires (MM/YY)");
    const nameField = screen.getByLabelText("Name on card");
    const zipCodeField = screen.getByLabelText("Zip Code");
    const securityCodeField = screen.getByLabelText("Security Code (CVV)");

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
      fireEvent.click(screen.getByText(/Continue/i));
    });

    expect(screen.getByText("Pay $600.00")).toBeDefined();
    
    const payButton = screen.getByText("Pay $600.00");
    fireEvent.click(payButton);
    
    expect(screen.getByText("Thank you for your payment!")).toBeDefined();
  });
});
