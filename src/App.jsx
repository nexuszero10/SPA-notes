import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderPage from "./components/Navigate";
import HomePageWrapper from "./pages/HomePage";
import ArchivePageWrapper from "./pages/ArchivePage";
import DetailPageNoteWrapper from "./pages/DetailNotePage";
import AddPage from "./pages/AddPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <Router basename="/SPA-notes">
            <div className="app-container">
                <header>
                    <HeaderPage />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePageWrapper />} />
                        <Route path="/archives" element={<ArchivePageWrapper />} />
                        <Route path="/notes/:id" element={<DetailPageNoteWrapper />} />
                        <Route path="/notes/add" element={<AddPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
