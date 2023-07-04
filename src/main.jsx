import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";
import { AppContextProvider } from "./context/AppContext.jsx";

//Production
// export const server = "https://backend-todo-app-gt1s.onrender.com/api/v1";
//Development
export const server = "http://localhost:5000/api/v1";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
