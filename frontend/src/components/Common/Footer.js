import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="container mt-auto">
            <div className="d-flex flex-wrap justify-content-between align-items-center py-2 px-3 my-3 border-top">
                <p className="col-md-4 mb-0 text-body-secondary">
                    © LoL Personal Review
                </p>
                <ul className="nav col-auto justify-content-end">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className="nav-link px-2 text-body-secondary"
                        >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/"
                            className="nav-link px-2 text-body-secondary"
                        >
                            FAQs
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
