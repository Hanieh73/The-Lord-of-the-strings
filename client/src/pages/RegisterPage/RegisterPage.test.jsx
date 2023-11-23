// RegisterPage.test.jsx
import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RegisterPage from "."; 

// Mock the ExampleProvider and useExample hook from your context
vi.mock("../../contexts", () => ({
  ExampleProvider: vi
    .fn()
    .mockImplementation(({ children }) => <>{children}</>),
  useExample: vi.fn(() => ({
    isLoggedIn: false,
    setIsLoggedIn: vi.fn(),
    userID: 0,
    setUserID: vi.fn(),
    username: "",
    setUsername: vi.fn(),
  })),
}));

// Mock react-router-dom's useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import the actual module
  return {
    ...actual, // Spread all of the actual exports
    useNavigate: () => vi.fn(), // Override the specific exports you want to mock
  };
});

describe("RegisterPage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays Full Name with appropriate text", () => {
    const fullNameInput = screen.getByPlaceholderText("Name"); // Adjust placeholder text
    expect(fullNameInput).toBeInTheDocument();
  });

  it("Displays a username with appropriate text", () => {
    const usernameInput = screen.getByPlaceholderText("Username");
    expect(usernameInput).toBeInTheDocument();
  });

  it("Displays a password input with appropriate text", () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("Displays a Submit button with appropriate text", () => {
    const submitButton = screen.getByRole("button", { name: /register/i }); // Adjust button text
    expect(submitButton).toBeInTheDocument();
  });

  it("submits data when credentials entered and submit is clicked", async () => {
    const fullNameInput = screen.getByPlaceholderText("Name");
    userEvent.type(fullNameInput, "Test User");

    const usernameInput = screen.getByPlaceholderText("Username");
    userEvent.type(usernameInput, "user");

    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "pass");

    const confirmPasswordInput = screen.getByPlaceholderText("Confirm password");
    userEvent.type(confirmPasswordInput, "pass");

    const submitButton = screen.getByRole("button", { name: /register/i });

    // Mock fetch implementation
    const fetchSpy = vi.spyOn(global, "fetch");
    const mockJsonPromise = Promise.resolve({});
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 201, // Assuming 201 Created for successful registration
    });

    fetchSpy.mockImplementation(() => mockFetchPromise);

    userEvent.click(submitButton);

    // Use waitFor instead of vi.waitFor
    await vi.waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });

    fetchSpy.mockRestore();
  });
});
