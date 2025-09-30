import { StrictMode } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { makeServer } from "../api/server.js";
import JobsProvider from "./context/Jobsprovider.jsx";
import ErrorBoundary from "./ErrorBoundary";

// Start Mirage in both dev & production 
if (import.meta.env.DEV || import.meta.env.PROD) {
  makeServer();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JobsProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </JobsProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
