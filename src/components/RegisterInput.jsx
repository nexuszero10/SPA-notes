import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function RegisterInput({registerHandler}){
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');

    function onSubmitEventHandler(event){
        event.preventDefault();
        registerHandler({name, email, password});
    }

    return (
        <form className="input-register" onSubmit={onSubmitEventHandler}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={onNameChange}/>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={onEmailChange}/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={onPasswordChange}/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange}/>

            <button type="submit">Register</button>
        </form>
    );
}

RegisterInput.propTypes = {
    registerHandler: PropTypes.func.isRequired,
};

export default RegisterInput ;