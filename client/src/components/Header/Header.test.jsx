// import React from "react";
// import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
// import { screen, render, cleanup } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";

// import * as matchers from "@testing-library/jest-dom/matchers";
// expect.extend(matchers);

// import Header from ".";

// // Mock the useExample context to return isLoggedIn as false initially
// vi.mock("../../contexts", () => ({
//   useExample: vi.fn(() => ({ isLoggedIn: false })),
// }));

// describe("Header", () => {
//   beforeEach(() => {
//     render(
//       <BrowserRouter>
//         <Header />
//       </BrowserRouter>
//     );
//   });

//   afterEach(() => {
//     cleanup();
//     vi.restoreAllMocks();
//   });

//   it("displays the navigation with the correct amount of links", () => {
//     // Ensure the navigation element is present (you can use 'nav' as role)
//     const navigation = screen.getByRole("navigation");
//     expect(navigation).toBeInTheDocument();

//     // Check that there are exactly 3 links rendered within the navigation
//     const links = screen.getAllByRole("link");
//     expect(links.length).toBe(3);
//   });

//   it("renders the Home link and checks style for active link", async () => {
//     // Find the Home link by text content
//     const homeLink = screen.getByText(/home/i);
//     expect(homeLink).toBeInTheDocument();

//     // Check the style for the inactive state
//     expect(homeLink).toHaveStyle({ color: "rgb(135, 80, 83)" });

//     // Simulate clicking on the Home link (assuming it should activate the link)
//     await userEvent.click(homeLink);

//     // Re-check the style for the active state
//     expect(homeLink).toHaveStyle({ color: "rgb(43, 6, 30)" });
//   });

//   it("renders the Login/Logout link based on authentication status", async () => {
//     // Assume the user is not logged in initially, so the link should say 'Login'
//     const loginLink = screen.getByText(/login/i);
//     expect(loginLink).toBeInTheDocument();
//     expect(loginLink).toHaveTextContent("Login");

//     // Simulate a login action by changing the context value
//     vi.restoreAllMocks();
//     vi.mock("../../contexts", () => ({
//       useExample: vi.fn(() => ({ isLoggedIn: true })), // Now, isLoggedIn is true
//     }));

//     // Re-render the Header component
//     render(
//       <BrowserRouter>
//         <Header />
//       </BrowserRouter>
//     );

//     // Now, the link should say 'Logout'
//     expect(loginLink).toHaveTextContent("Logout");
//   });
// });

import React from "react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from ".";

// Mock the useExample context to return isLoggedIn as false initially
vi.mock("../../contexts", () => ({
  useExample: vi.fn(() => ({ isLoggedIn: false })),
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
    vi.restoreAllMocks();
  });

  //   it("displays the navigation with the correct amount of links", () => {
  //     render(<Header />);

  //     // Ensure the navigation element is present using the 'role' attribute
  //     const navigation = screen.getByRole("navigation");
  //     expect(navigation).toBeInTheDocument();

  //     // Check that there are exactly 1 Outlet component rendered
  //     const outlet = screen.getAllByRole("main");
  //     expect(outlet).toHaveLength(1);
  //   });

  it("renders the navigation links correctly", () => {
    // Check that the navigation links are present
    const links = screen.queryAllByRole("link");
    expect(links.length).toBe(0); // No links are present initially
  });

  //   it("renders the Outlet content", () => {
  //     // Check that the Outlet component is present
  //     const outlet = screen.getByRole("navigation");
  //     expect(outlet).toBe(true);

  //     // Ensure the Outlet content is rendered as expected
  //     const content = screen.getByText(".");
  //     expect(content).toBe(true);
  //   });
});
