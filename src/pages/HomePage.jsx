import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/api";
import { showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import AddButton from "../components/AddButton";
import LanguageContext from "../context/LanguageContext";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || "");
    const [loading, setLoading] = React.useState(true);
    const { language } = React.useContext(LanguageContext);

    React.useEffect(() => {
        const fetchNotes = async () => {
            const { data } = await getActiveNotes();
            setNotes(
                data.map(note => ({
                    ...note,
                    createdAt: showFormattedDate(note.createdAt),
                }))
            );
            setLoading(false);
        };

        fetchNotes();

        return () => {
            setNotes([]);
            setLoading(true);
        }
    }, []);

    function onKeywordChangeHandler(keyword) {
        setKeyword(keyword);
        setSearchParams({ keyword });
    }

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase());
    });

    return (
        <section className="homepage">
            <h2>{language === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            {loading ? (
                <p>{language === 'id' ? 'Mengambil catatan aktif' : 'Fetching Active Notes...'}</p>
            ) : notes.length === 0 ? (
                <p>{language === 'id' ? 'Tidak ada catatan aktif' : 'No active notes'}</p>
            ) : filteredNotes.length > 0 ? (
                <NoteList notes={filteredNotes} />
            ) : (
                <p>{language === 'id' ? 'Tidak ada catatan yang sesuai' : 'No matching notes found'}</p>
            )}
            <AddButton />
        </section>
    );
}

export default HomePage;
