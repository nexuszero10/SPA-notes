import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import RegisterInput from "../components/RegisterInput";
import  LanguageContext from "../context/LanguageContext";

function RegisterPage(){
    const  { language } = React.useContext(LanguageContext);
    const navigate = useNavigate();

    async function onRegisterHandler(user){
        const { error } = await register(user);

        if(!error){
            navigate("/");
        }
    }

    return (
        <section className="register-page">
            <h2>{language === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill out the form to register for an account'}</h2>
            <RegisterInput registerHandler={onRegisterHandler}/>
            <p>{language === 'id' ? 'Sudah punya akun ?' : 'Already have an account?'} <Link to="/">{language === 'id' ? 'Login di sini' : 'Login here'}</Link></p>
        </section>
    )
}

export default RegisterPage ;