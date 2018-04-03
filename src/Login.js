import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import './css/Login.css';
import axios from 'axios';


class Login extends Component {

    state = {
        username: '',
        password: '',
        loggedIn: false,
        uid: -1,
        errorMsg: '',
    }

    handlePassword = event => {
        this.setState({password: event.target.value});
    }

    handleUsername = event => {
        this.setState({username: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const login_cred = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(this.state.username);
        console.log(this.state.password);
        axios.post('http://localhost:7000/auth/login/', login_cred)
        .then(response => {
            console.log(response.status);
            if(response.status == 200){
                this.setState({
                    loggedIn:true,
                });
                localStorage.setItem('uid', response.data);
            }
        	console.log(response)
        })
        .catch(error => {
            console.log(error.response);
            console.log(error.response.data.message);
            if (error.response.data.message){
                this.setState({
                    errorMsg: error.response.data.message,
                });
            }
        });
    }

    getErrorMessage(){
        const message = this.state.errorMsg;
        if (!message) return null;
        return(
            <div id="error-msg-container">
                <p className="mr-auto text-white">
                {message}
                </p>
            </div>
        );
    }

    render(){


        if (this.state.loggedIn){
            return(
                <Redirect to="/" />

            );
        }

        return(
            <div>
                <div className = "row">
                    {this.getErrorMessage()}
                </div>
                <div className="row">
                    <div className="login-container w-100 p-auto h-100">
                        <div className="w-10 m-auto p-2 px-4 text-white login-card card">
                            <form name="login" className="form-group" onSubmit={this.handleSubmit}>
                                <h1>Login</h1>
                                <input onChange={this.handleUsername} ref="username" className="mb-2 form-control" id="username" placeholder="Username"></input>
                                <input onChange={this.handlePassword} ref="password" type="password" className="mb-2 form-control" id="pasword" placeholder="Password"required></input>
                                <div className="row">
                                    <div className="col-md-6 col-sm-16 pr-1 pl-3">
                                        <button type="submit" className="btn w-100 my-2 btn-warning">Login</button>
                                    </div>
                                    <div className="col-md-6 col-sm-16 pr-3 pl-1">
                                        <a className="btn w-100 my-2 btn-dark" href="/signup">Sign Up</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
