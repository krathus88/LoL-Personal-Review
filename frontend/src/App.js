import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Home from "./pages/Home";
import Summoners from "./pages/Summoners";
import "./App.css";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/summoners" element={<Summoners />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
