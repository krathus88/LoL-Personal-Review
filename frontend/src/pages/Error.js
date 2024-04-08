import React from "react";
import Errors from "../components/Error/Errors";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

function Error() {
    return (
        <>
            <Header />
            <main className="text-center mt-5">
                <Errors />
            </main>
            <Footer />
        </>
    );
}

export default Error;
