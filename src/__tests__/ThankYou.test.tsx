import { describe, expect, test} from "vitest";
import { render, screen } from "@testing-library/react";
import { ThankYou } from "../ThankYou";

describe("ThankYou", () => {
  test("renders component with the correct message", () => {
    render(<ThankYou />);
    expect(screen.getByText("Thank you for your payment!")).toBeDefined();
  });
});
