import React from "react";
import PropTypes from "prop-types";
import LanguageContext from "../context/LanguageContext";

function SearchBar ({keyword, keywordChange}){
    const  { language } = React.useContext(LanguageContext);

    return (
        <section className="search-bar">
            <input 
                type="text" 
                placeholder={language === 'id' ? 'Cari berdasarkan judul catatan' : 'Search by notes title'}
                value={keyword}
                onChange={(event) => keywordChange(event.target.value)}
            />
        </section>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
}


export default SearchBar ;