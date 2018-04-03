import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import './css/Login.css';
import axios from 'axios';

class Signup extends Component {
    
    state = {
        username: '',
        password: '',
        loggedIn: false,
        confirmPassword: '',
        email: '',
        type: '',
        uid: -1,
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

    handleSubmit = event => {
        event.preventDefault();
        const login_cred = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            type: this.state.type,
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
                localStorage.setItem('uid', response.data);
            }
        	console.log(response)
        })
        .catch(error => {
            console.log(error.response);
            if (error.response.data.status == 300){
                //redirect to some page
            }
        });
    }

    render(){

        
        if (this.state.loggedIn){
            return(
                <Redirect to="/" />
                
            );
        }

        return(
            <div className="login-container p-auto h-100">
                <div className="w-10 m-auto p-2 px-4 text-white login-card card">
                    <form name="login" className="form-group" onSubmit={this.handleSubmit}>
                        <h1>Signup</h1>
                        <input onChange={this.handleUsername} ref="username" className="mb-2 form-control" id="username" placeholder="Username"required></input>
                        <input onChange={this.handleEmail} ref="email" type="email" className="mb-2 form-control" id="email" placeholder="Email"required></input>
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
        );
    }
}
export default Signup;
