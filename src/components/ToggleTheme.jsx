import React from "react";
import { FaMoon, FaSun } from 'react-icons/fa';
import ThemeContext from "../context/ThemeContext";

function ToggleTheme(){
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    return (
        <button className="toggle-theme" onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
    )
}

export default ToggleTheme ;