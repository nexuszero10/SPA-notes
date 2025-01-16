import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import { getNote, deleteNote, archiveNote, unarchiveNote} from "../utils/local-data";
import { showFormattedDate } from "../utils";
import NoteItemDetail from "../components/NoteItemDetail";
import DeleteButton from "../components/DeleteButton";
import ArchiveButton from "../components/ArchiveButton";
import PropTypes from "prop-types";

function DetailPageNoteWrapper(){
    const { id } = useParams();
    const navigate = useNavigate();
    return <DetailNotePage note_id={id} navigate={navigate}/>
}

class DetailNotePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            note: {
                ...getNote(props.note_id),
                createdAt: showFormattedDate(getNote(props.note_id).createdAt),
            }           
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.props.navigate("/");
    }

    onArchiveHandler(id){
        if(this.state.note.archived){
            unarchiveNote(id);
            this.props.navigate("/");
        } else {
            archiveNote(id);
            this.props.navigate("/archives");
        }

        this.setState(() => {
            return {
                note: getNote(id),
            }
        })
    }

    render(){
        return (
            <section className="detail-page">
                <NoteItemDetail {...this.state.note}/>
                <div className="detail-page__action">
                    <ArchiveButton id={this.state.note.id} archived={this.state.note.archived} onArchive={this.onArchiveHandler}/>
                    <DeleteButton id={this.state.note.id} onDelete={this.onDeleteHandler}/>
                </div>
            </section>
        );
    }
}

DetailNotePage.propTypes = {
    note_id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
}

export default DetailPageNoteWrapper ;