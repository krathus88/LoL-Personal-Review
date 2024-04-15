import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Common/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SummonerPage, { SummonerLoader } from "./pages/SummonerPage";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                    },
                    {
                        path: "/summoner/:region/:summonerNameTag",
                        loader: SummonerLoader,
                        element: <SummonerPage />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
