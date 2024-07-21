import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WelcomeMessage } from "../WelcomeMessage";

describe("WelcomeMessage", () => {
  /**
   * None of the components are currently fetching data from a backend so the 
   * data is static, if there was a backend, we would mock the API call here and pass
   * the data to the component which should then render the Correct customer name
   * and the correct total. 
   */
  test("renders with correct data", () => {
    render(<WelcomeMessage handleNext={() => {}} />);
    expect(screen.getByText("Hi, Taylor")).toBeDefined();
    expect(screen.getByText("$600.00")).toBeDefined();
  });

  test("pay total button is called", () => {
    const handleNext = vi.fn();
    render(<WelcomeMessage handleNext={handleNext} />);
    fireEvent.click(screen.getByText(/pay total/i));
    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
