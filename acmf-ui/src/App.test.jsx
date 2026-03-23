// Mock localStorage globally
beforeAll(() => {
    global.localStorage = {
      getItem: jest.fn(() => "mock-jwt-token"), // Always return a mock token
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
  });
  
  import React from "react";
  import { render, screen, waitFor } from "@testing-library/react";
  import { BrowserRouter as Router } from "react-router-dom";
  import { Provider } from "react-redux";
  import configureStore from "redux-mock-store";
  import App from "./App";
  
  // Mock Redux store generically
  const mockStore = configureStore([]);
  
  // Mock lazy-loaded components generically
  jest.mock("./pages/Home/Home", () => ({ children }) => (
    <div data-testid="home">{children || "Home"}</div>
  ));
  jest.mock("./pages/Project/ProjectDetails", () => ({ children }) => (
    <div data-testid="project-details">{children || "ProjectDetails"}</div>
  ));
  jest.mock("./pages/AdminDashboard/AdminDashboard", () => ({ children }) => (
    <div data-testid="admin-dashboard">{children || "AdminDashboard"}</div>
  ));
  jest.mock("./pages/Project/ProjectCreation/GenerateProject", () => ({ children }) => (
    <div data-testid="generate-project">{children || "GenerateProject"}</div>
  ));
  
  describe("App Component Tests", () => {
    let store;
  
    beforeEach(() => {
      // Initialize a default mock store
      store = mockStore({
        auth: {
          loading: false,
          user: null,
          jwt: null,
        },
      });
    });
  
    it("mocks localStorage.getItem", () => {
      const token = localStorage.getItem("jwt");
      expect(token).toBe("mock-jwt-token"); // Always returns the mock token
    });
  
    it("renders Navbar component", () => {
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      // Use a generic selector for Navbar
      const navbarElement = screen.getByTestId("navbar");
      expect(navbarElement).toBeInTheDocument();
    });
  
    it("shows Loader when auth.loading is true", () => {
      store = mockStore({
        auth: {
          loading: true,
          user: null,
          jwt: null,
        },
      });
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      // Use a generic selector for Loader
      const loaderElement = screen.getByTestId("loader");
      expect(loaderElement).toBeInTheDocument();
    });
  
    it("renders Auth component when user is not authenticated", () => {
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      // Use a generic selector for Auth
      const authElement = screen.getByTestId("auth");
      expect(authElement).toBeInTheDocument();
    });
  
    it("renders Home component for the root route when authenticated", () => {
      store = mockStore({
        auth: {
          loading: false,
          user: { id: 1, name: "John Doe" },
          jwt: "mock-jwt-token",
        },
      });
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      // Use a generic selector for Home
      const homeElement = screen.getByTestId("home");
      expect(homeElement).toBeInTheDocument();
    });
  
    it("renders ProjectDetails component for /project/:id route", async () => {
      store = mockStore({
        auth: {
          loading: false,
          user: { id: 1, name: "John Doe" },
          jwt: "mock-jwt-token",
        },
      });
      render(
        <Provider store={store}>
          <Router initialEntries={["/project/1"]}>
            <App />
          </Router>
        </Provider>
      );
      await waitFor(() => {
        // Use a generic selector for ProjectDetails
        const projectDetailsElement = screen.getByTestId("project-details");
        expect(projectDetailsElement).toBeInTheDocument();
      });
    });
  
    it("redirects unmatched routes to the home page", () => {
      store = mockStore({
        auth: {
          loading: false,
          user: { id: 1, name: "John Doe" },
          jwt: "mock-jwt-token",
        },
      });
      render(
        <Provider store={store}>
          <Router initialEntries={["/unknown-route"]}>
            <App />
          </Router>
        </Provider>
      );
      // Use a generic selector for Home
      const homeElement = screen.getByTestId("home");
      expect(homeElement).toBeInTheDocument();
    });
  
    it("displays ErrorBoundary fallback UI on error", () => {
      jest.spyOn(React, "lazy").mockImplementation(() => {
        throw new Error("Test error");
      });
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      // Use a generic selector for ErrorBoundary fallback
      const errorElement = screen.getByText(/something went wrong/i);
      expect(errorElement).toBeInTheDocument();
    });
  });