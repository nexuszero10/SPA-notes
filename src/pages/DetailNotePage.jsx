import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import NoteItemDetail from "../components/NoteItemDetail";
import DeleteButton from "../components/DeleteButton";
import ArchiveButton from "../components/ArchiveButton";
import { showFormattedDate } from "../utils";

function DetailNotePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);

    useEffect(() => {
        async function fetchNoteData() {
            const { data, error } = await getNote(id);
            if (!error) {
                setNote({...data, createdAt: showFormattedDate(data.createdAt)} || null);
            }
        }

        fetchNoteData();

        return () => {
            setNote(null);
        };
    }, [id]);

    const onDeleteHandler = async (noteId) => {
        await deleteNote(noteId);
        navigate("/");
    };

    const onArchiveHandler = async (noteId) => {
        if (note.archived) {
            await unarchiveNote(noteId);
            navigate("/");
        } else {
            await archiveNote(noteId);
            navigate("/archives");
        }
    };

    return (
        <section className="detail-page">
            {!note ? (
                <p>Loading...</p>
            ) : (
                <>
                    <NoteItemDetail {...note} />
                    <div className="detail-page__action">
                        <ArchiveButton
                            id={note.id}
                            archived={note.archived}
                            onArchive={onArchiveHandler}
                        />
                        <DeleteButton id={note.id} onDelete={onDeleteHandler} />
                    </div>
                </>
            )}
        </section>
    );
}

export default DetailNotePage;
