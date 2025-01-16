import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/local-data";
import { showFormattedDate } from "../utils";
import PropTypes, { string } from "prop-types";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import AddButton from "../components/AddButton";

function HomePageWrapper(){
    const [searchParams, setSearchParams] =  useSearchParams();
    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword){
        setSearchParams({keyword});
    }

    return <Homepage defaultKeyword={keyword} keywordChange={changeSearchParams}/>
}

class Homepage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            notes: getActiveNotes().map((note) => {
                return {
                    ...note,
                    createdAt: showFormattedDate(note.createdAt)
                };
            }),
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
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
            <section className="homepage">
                <h2>Catatan Aktif</h2>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler}/>
                <NoteList notes={notes}/>
                <AddButton />
            </section>
        )
    }
}

Homepage.proptypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
}

export default HomePageWrapper ;
