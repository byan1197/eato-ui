import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import './css/Login.css';
import axios from 'axios';

class Signup extends Component {

    
    
    state = {
        username: '',
        password: '',
        name: '',
        loggedIn: false,
        confirmPassword: '',
        email: '',
        type: '',
        uid: -1,
        errorMsg: '',
    }

    
    handlePassword = event => {
        this.setState({password: event.target.value});
    }

    handleUsername = event => {
        this.setState({username: event.target.value});
    }
    handleEmail = event => {
        this.setState({email: event.target.value});
    }

    handleConfirmPassword = event => {
        this.setState({confirmPassword: event.target.value});
    }

    handleType = event => {
        this.setState({type: event.target.value});
    }

    handleName = event => {
        this.setState({name: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const login_cred = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            type: this.state.type,
            name: this.state.name,
            uid: -1,
            reputation: -1,
        }
        console.log(login_cred);

        axios.post('http://localhost:7000/auth/signup/', login_cred)
        .then(response => {
            console.log(response.status);
            if(response.status == 200){
                this.setState({
                    loggedIn:true,
                });
                console.log(response.data);
            }
        	console.log(response)
        })
        .catch(error => {
            console.log(error.response);
            if (error.response.data.status == 300){
                //redirect to some page
            }
            else if (error.response.data.status == 500){
                this.setState({
                    errorMsg: error.response.data.message,
                })
            }
        });
    }

    getErrorMessage(){
        const message = this.state.errorMsg;
        if (!message) return null;
        return(
            <div id="error-msg-container" className="bg-danger">
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
                <div className = "row">
                    <div className="login-container w-100 p-auto h-100">
                        <div className="w-10 m-auto p-2 px-4 login-card card">
                            <form name="login" className="form-group" onSubmit={this.handleSubmit}>
                                <h1>Signup</h1>
                                <input onChange={this.handleUsername} ref="username" className="mb-2 form-control" id="username" placeholder="Username"required></input>
                                <input onChange={this.handleEmail} ref="email" type="email" className="mb-2 form-control" id="email" placeholder="Email"required></input>
                                <input onChange={this.handleName} ref="name" type="name" className="mb-2 form-control" id="email" placeholder="Name"required></input>
                                <input onChange={this.handlePassword} ref="password" type="password" className="mb-2 form-control" id="pasword" placeholder="Password"required></input>
                                <input onChange={this.handleConfirmPassword} ref="password_confirm" type="password" className="mb-2 form-control" id="pasword_confirm" placeholder="Confirm Password"required></input>

                                <div  className="input-group mb-3">
                                    <select onChange={this.handleType} className="custom-select" id="inputGroupSelect02">
                                        <option value="" selected></option>
                                        <option value="Casual">Casual</option>
                                        <option value="Blog">Blog</option>
                                        <option value="Online">Online</option>
                                        <option value="Food Critic">Food Critic</option>
                                    </select>

                                </div>

                                <div className="row">
                                    <div className="col-md-12 col-sm-16 pr-1 pl-3">
                                        <button type="submit" className="btn w-100 my-2 btn-warning">Signup</button>
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
export default Signup;
