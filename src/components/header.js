import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {showLogin:false,loginBtn:true}
        this.signOut = this.signOut.bind(this);
    }
    submitForm(e) {
        e.preventDefault();
        const login = this.login.current.value;
        const password = this.password.current.value ;
        this.login.current.value = '';
        this.password.current.value = '';
        this.props.processLogin(login, password);
    }
    _showLogin = (bool) =>{
        this.setState({
            showLogin: bool,
            loginBtn: false
        });
    }
    signOut(){
        this.props.processLogOut(this.props.isAdmin);
        console.log(this.props.isAdmin);

    }
    render() {
        this.login = React.createRef();
        this.password = React.createRef();
        return <header className="header">
        <div className="container">
            <Link to="/" className="header__logo">MyTaskApp</Link>
            <Link to="/new" className="header__addTask">
                Add Task
            </Link>

            {this.props.isAdmin ? <div><span>admin</span> <button  className="btn" onClick= {this.signOut}>Sign Out</button>  </div> : <div> {this.state.loginBtn && (<button className="btn" onClick={this._showLogin.bind(null, true)}>Login</button>)}
            {this.state.showLogin && (<form className="login-form" onSubmit={this.submitForm}>
                <input type="text" name="login" ref={this.login} placeholder="Login"></input><br/>
                <input type="password" name="password" ref={this.password} placeholder="Password"></input><br/>
                <button>Login</button>
            </form>)}</div>}
            </div>
        </header>
    }
}

export default Header;
