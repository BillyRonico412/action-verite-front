import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Action from "./Action";
import App from "./App";
import "./index.css";
import Verite from "./Verite";
import { store } from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/action",
        element: <Action />,
    },
    {
        path: "/verite",
        element: <Verite />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
