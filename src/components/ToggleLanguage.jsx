import React from "react";
import { SiGoogletranslate } from "react-icons/si";
import  LanguageContext from "../context/LanguageContext";

function ToggleLanguage(){
    const { language, toggleLanguage } = React.useContext(LanguageContext);
    return (
        <button className="toggle-locale" onClick={toggleLanguage}><SiGoogletranslate/></button>
    )
}

export default ToggleLanguage ;