import React from "react";
import { Link } from "react-router-dom";

function HeaderPage(){
    return (
        <>
            <h1>
                <Link to="/">Aplikasi Catatan</Link>
            </h1>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to ="/archives">Archived Notes</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default HeaderPage ;