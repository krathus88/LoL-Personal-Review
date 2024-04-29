import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Common/Layout";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: "/",
                        lazy: () => import("./pages/HomePage"),
                    },
                    {
                        path: "/summoner/:region/:summonerNameTag",
                        lazy: () => import("./pages/SummonerPage"),
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
