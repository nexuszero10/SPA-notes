import React from "react";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";

function AddPage() {
    const navigate = useNavigate();

    async function onAddNoteHandler(note){
        await addNote(note);
        navigate('/');
    }

    return <NoteInput addNote={onAddNoteHandler}/>;
}

export default AddPage;
