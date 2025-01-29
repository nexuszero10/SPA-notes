import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navigate from "./components/Navigate";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import DetailPageNoteWrapper from "./pages/DetailNotePage";
import AddPage from "./pages/AddPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import  ThemeContext  from "./context/ThemeContext";
import LanguageContext from "./context/LanguageContext";

function App() {
    const [authedUser, setAuthedUser] = React.useState(null);
    const [initializing, setInitializing] = React.useState(true);
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');
    const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'id');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'id' ? 'en' : 'id';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    }

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const ThemeContextValue = React.useMemo(() => {
        return {
            theme,
            toggleTheme
        };
    }, [theme]);

    const LanguangeContextValue = React.useMemo(() => {
        return {
            language,
            toggleLanguage
        }
    }, [language]);

    async function onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
    }

    function onLogout(){
        setAuthedUser(null);
        putAccessToken('');
    }

    React.useEffect(() => {
        const fetchUserLogged = async () => {
            const { data } = await getUserLogged();
            setAuthedUser(data);
            setInitializing(false);
        };

        fetchUserLogged();
    }, []);

    if (initializing) {
        return null;
    }

    if (authedUser === null) {
        return (
            <ThemeContext.Provider value={ThemeContextValue}>
                <LanguageContext.Provider value={LanguangeContextValue}>
                    <div className="app-container">
                        <header>
                            <h1><Link to="/">{language === 'id' ? 'Aplikasi Catatan' : 'Note Application'}</Link></h1>
                            <Navigate />
                        </header>
                        <main>
                            <Routes>
                                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Routes>
                        </main>
                    </div>
                </LanguageContext.Provider>
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={ThemeContextValue}>
            <LanguageContext.Provider value={LanguangeContextValue}>
                <div className="app-container">
                    <header>
                        <h1><Link to="/">{language === 'id' ? 'Aplikasi Catatan' : 'Note Application'}</Link></h1>
                        <Navigate username={authedUser.name} onLogout={onLogout}/>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/archives" element={<ArchivePage />} />
                            <Route path="/notes/:id" element={<DetailPageNoteWrapper />} />
                            <Route path="/notes/add" element={<AddPage />} />
                            <Route path="/*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                </div>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;
