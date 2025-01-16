import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList ({notes}){
    return (
        <section className={notes.length > 0 ? "notes-list" : "notes-list-empty"}>
            {
                notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteItem key={note.id} {...note}/>
                    ))
                ) : (
                    <p className="notes-list__empty">Tidak ada catatan</p>
                )
            }
        </section>
    )
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
}

export default NoteList ;