import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Summoner, { summonerLoader } from "./pages/Summoner";
import Error from "./pages/Error";
import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/summoner/:region/:summonerNameTag",
        element: <Summoner />,
        loader: summonerLoader,
    },
    {
        path: "/error",
        element: <Error />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
