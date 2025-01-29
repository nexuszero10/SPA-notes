import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import ToggleTheme from "./ToggleTheme";
import ToggleLanguage from "./ToggleLanguage";
import LanguageContext from "../context/LanguageContext";

function Navigate({ username, onLogout }) {
    const { language } = React.useContext(LanguageContext);

    return (
        <nav className="navigation">
            {username ? (
                <>
                    <ul>
                        <li><Link to="/archives">{language === 'id' ? 'Halaman Arsip' : 'Archived Pages'}</Link></li>
                        <li><ToggleLanguage /></li>
                        <li><ToggleTheme /></li>
                        <li><button onClick={onLogout} className="button-logout" title="Logout"><FiLogOut /> {username}</button></li>
                    </ul>
                </>
            ) : (
                <ul>
                        <li><ToggleLanguage /></li>
                        <li><ToggleTheme/></li>                
                </ul>
            )}
        </nav>
    );
}

Navigate.propTypes = {
    username: PropTypes.string,
    onLogout: PropTypes.func,
};

export default Navigate;
