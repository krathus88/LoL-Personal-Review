import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Summoner, { SummonerLoader } from "./pages/Summoner";
import Error from "./pages/Error";
import Layout from "./components/Common/Layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                errorElement: <Error />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/summoner/:region/:summonerNameTag",
                        element: <Summoner />,
                        loader: SummonerLoader,
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
