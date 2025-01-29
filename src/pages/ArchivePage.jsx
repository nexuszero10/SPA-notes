import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/api";
import { showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import LanguageContext from "../context/LanguageContext";

function ArchivePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => searchParams.get("keyword") || "");
    const [loading, setLoading] = React.useState(true);
    const { language } = React.useContext(LanguageContext);

    React.useEffect(() => {
        const fetchNotes = async () => {
            const { data } = await getArchivedNotes();
            setNotes(
                data.map((note) => ({
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
        return note.title.toLowerCase().includes(
            keyword.toLowerCase()
        );
    });

    return (
        <section className="archived-pages">
            <h2>{language === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            {loading ? (
                <p>{language === 'id' ? 'Menganbil catatan arsip' : 'Fetching Archibed Notes'}</p>
            ) : notes.length === 0 ? (
                <p>{language === 'id' ? 'Tidak ada catatan arsip' : 'No archived notes'}</p>
            ) : filteredNotes.length > 0 ? (
                <NoteList notes={filteredNotes} />
            ) : (
                <p>{language === 'id' ? 'Tidak ada catatan yang sesuai' : 'No matching notes found'}</p>
            )}
        </section>
    );
}

export default ArchivePage;
