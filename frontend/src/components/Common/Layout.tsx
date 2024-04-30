import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { ProgressBarLoading } from "./ProgressBarLoading";

export function Layout() {
    return (
        <>
            <ProgressBarLoading />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
