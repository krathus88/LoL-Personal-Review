import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Common/Layout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Summoner, { SummonerLoader } from "./pages/Summoner";

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
                        loader: SummonerLoader,
                        element: <Summoner />,
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
