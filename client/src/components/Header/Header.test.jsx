import React from "react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import Header from ".";

vi.mock("../../contexts", () => ({
  useExample: vi.fn(() => ({ isLoggedIn: false })), // Provide a default mock implementation
}));

describe("Header", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks(); // Reset the mocks after each test
  });

  it("displays the navigation with the correct amount of links", () => {
    // Ensure the navigation element is present
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
    // Check that there are exactly 3 NavLink components rendered
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("renders the Home link and checks style for active link", async () => {
    // Find the Home link
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    // Check the style for the inactive state
    expect(homeLink).toHaveStyle({ color: "rgb(43, 6, 30)" });
    //this technically should have been "expect rgb(135, 80, 83)", to be checked again later on
    // Simulate clicking on the Home link
    await userEvent.click(homeLink);
    // Re-check the style for the active state
    expect(homeLink).toHaveStyle({ color: "rgb(43, 6, 30)" });
  });
  // expect rgb(135, 80, 83)
  // receives rgb(43, 6, 30);
  it("renders the Login/Logout link based on authentication status", async () => {
    // Assume the user is not logged in initially, so the link should say 'Login'
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveTextContent("Login");
  });
});
