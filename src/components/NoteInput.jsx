import React from "react";
import SaveButton from "./SaveButton";
import PropTypes from "prop-types";

class NoteInput extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            body: '',
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event){
        this.setState(() => {
            return {
                title: event.target.value,
            }
        });
    }

    onBodyChangeEventHandler(event){
        this.setState(() => {
            return {
                body: event.target.innerHTML,
            }
        });
    }

    onSubmitEventHandler(event){
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render(){
        return (
            <form className="add-new-page" onSubmit={this.onSubmitEventHandler}>
                <div className="add-new-page__input">
                    <input 
                        type="text" 
                        className="add-new-page__input__title" 
                        placeholder="Catatan rahasia"
                        value={this.state.title}
                        onChange={this.onTitleChangeEventHandler}
                    />
                    <div 
                        className="add-new-page__input__body" 
                        contentEditable="true" 
                        data-placeholder="Sebenarnya saya adalah"
                        onInput={(e) => this.onBodyChangeEventHandler(e)}
                    ></div>
                </div>
                <div className="add-new-page__action">
                    <SaveButton/>
                </div>
            </form>
        )
    }
}

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired,
}

export default NoteInput ;