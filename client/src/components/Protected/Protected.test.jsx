import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useExample } from "../../contexts";
import Protected from ".";

// Mock the useExample hook
vi.mock("../../contexts", () => ({
  useExample: vi.fn(),
}));

// Helper component to test rendering of children
const TestChildComponent = () => <div>Protected Content</div>;

describe("Protected", () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Reset the mocks after each test
  });

  it("renders children when the user is logged in", () => {
    // Mock isLoggedIn to be true
    vi.mocked(useExample).mockReturnValue({ isLoggedIn: true });

    const { queryByText } = render(
      <BrowserRouter>
        <Protected>
          <TestChildComponent />
        </Protected>
      </BrowserRouter>
    );

    // The protected content should be rendered
    expect(queryByText("Protected Content")).toBeTruthy();
  });

  it("does not render children when the user is not logged in", () => {
    // Mock isLoggedIn to be false
    vi.mocked(useExample).mockReturnValue({ isLoggedIn: false });

    const { queryByText } = render(
      <BrowserRouter>
        <Protected>
          <TestChildComponent />
        </Protected>
      </BrowserRouter>
    );

    // The protected content should not be rendered
    expect(queryByText("Protected Content")).toBeFalsy();
  });
});
