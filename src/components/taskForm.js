import React, { Component } from 'react';
import '../styles/taskForm.css';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            previewSrc: ''
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.previewTaskFunction = this.previewTaskFunction.bind(this);
    }
    validateForm() {
        if(this.form.current.reportValidity()) {
            return true;
        }
    }
    handleSubmitForm(e) {
        e.preventDefault();
        if(this.validateForm()) {
            var formData = new FormData();
            formData.append("username", this.username.current.value);
            formData.append("email", this.email.current.value);
            formData.append("text", this.text.current.value);
            this.props.submitForm(formData);
        }

    }
    previewTaskFunction(e) {
        e.preventDefault();
        if(!this.validateForm()) {
            return;
        };
        this.props.previewTask({
            username: this.username.current.value,
            email: this.email.current.value,
            text: this.text.current.value,
        });
    }
    render() {
        this.form = React.createRef();
        this.username = React.createRef();
        this.email = React.createRef();
        this.text = React.createRef();
        
        return (
            <form name="test" className="task-form" ref={this.form} onSubmit={this.handleSubmitForm}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="username" ref={this.username} required></input>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" name="email" ref={this.email} required pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"></input>
                <label htmlFor="text">Enter your task description</label>
                <textarea id="text" name="text" rows="10" cols="70" ref={this.text} required></textarea>
                <div className="button-group">
                    <button type="submit">Add task</button>
                    <button onClick={this.previewTaskFunction}>Preview</button>
                </div>
            </form>
        );
    }
}

export default TaskForm;
