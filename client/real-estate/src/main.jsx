import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketIoProvider } from "./context/SocketIoContext.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketIoProvider>
        <App />
      </SocketIoProvider>
    </AuthProvider>
  </React.StrictMode>
);
