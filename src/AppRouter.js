import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TaskContainer from './containers/taskContainer';
import NewTask from './containers/newTask';
import Header from './components/header'
import { login } from './utils'
import { logout } from './utils'

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false
        }
        this.processLogin = this.processLogin.bind(this);
        this.processLogOut = this.processLogOut.bind(this);
    }
    processLogOut(bool){
         logout(bool).then(() =>{
             this.setState({
                 isAdmin: false
             });
        })
    }
    processLogin(username, password) {
       
        login(username, password).then(() => {
            this.setState({
                isAdmin: true
            });

        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Header processLogin={this.processLogin} isAdmin={this.state.isAdmin} processLogOut={this.processLogOut}/>
                    <main>
                        <Route exact path="/" render={(props) => <TaskContainer {...props} isAdmin={this.state.isAdmin} />}/>
                        <Route path="/new" component={NewTask}/>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;

