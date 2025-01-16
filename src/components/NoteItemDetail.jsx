import React from "react";
import pasrer from 'html-react-parser'
import PropTypes from "prop-types";

function NoteItemDetail({title, createdAt, body}){
    return (
        <>
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{createdAt}</p>
            <div className="detail-page__body">{pasrer(body)}</div>
        </>
    )
}

NoteItemDetail.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default NoteItemDetail ;