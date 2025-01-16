import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/local-data";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

function ArchivePageWrapper(){
    const [searchParams, setSearchParams] =  useSearchParams();
    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword){
        setSearchParams({keyword});
    }

    return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams}/>
}

class ArchivePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            notes: getArchivedNotes().map((note) => {
                return {
                    ...note, 
                    createdAt: showFormattedDate(note.createdAt),
                };
            }),
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler =  this.onKeywordChangeHandler.bind(this);
    }

    onKeywordChangeHandler(keyword){
        this.setState(() => {
            return {
                keyword, 
            }
        });

        this.props.keywordChange(keyword);
    }

    render(){
        const notes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            );
        });

        return (
            <section className="archived-pages">
                <h2>Catatan Arsip</h2>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler}/>
                <NoteList notes={notes}/>
            </section>
        )
    }
}

ArchivePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
}

export default ArchivePageWrapper ;