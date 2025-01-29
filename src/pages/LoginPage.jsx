import React from "react";
import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { login } from "../utils/api";
import LanguageContext from "../context/LanguageContext";

function LoginPage({ loginSuccess }){
    const  { language } = React.useContext(LanguageContext);

    async function onLoginHandler({ email, password }){
        const { error, data } = await login({ email, password });
        if (!error){
            loginSuccess(data);
        }
    }

    return (
        <section className="login-page">
            <h2>{language === 'id' ? 'Yuk, login untuk menggunakan aplikasi' : 'Login to use the app'}</h2>
            <LoginInput loginHandler={onLoginHandler}/>
            <p>{language === 'id' ? 'Belum punya akun ?' : `Don't have account yet ?`} <Link to="/register">{language === 'id' ? 'Daftar disini' : 'Register Here'}</Link></p>
        </section>
    )
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage ;