import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ProgressBarLoading from "./ProgressBarLoading";

export const IsMobileContext = createContext();

function Layout() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set up resize event listener
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Add isMobile to the dependency array

    return (
        <>
            <ProgressBarLoading />
            <IsMobileContext.Provider value={isMobile}>
                <Header />
                <Outlet />
            </IsMobileContext.Provider>
            <Footer />
        </>
    );
}

export default Layout;
