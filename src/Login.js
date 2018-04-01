import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import './css/Login.css';

class Login extends Component {
    handleSubmit(data){
        console.log(data);
    }
    render(){
        return(
            <div className="login-container">
                <div className="w-10 m-auto p-2 px-4 login-card card">
                    <form name="login" className="form-group" onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <input ref="username" className="mb-2 form-control" id="username" placeholder="Username"></input>
                        <input ref="password" type="password" className="mb-2 form-control" id="pasword" placeholder="Password"required></input>
                        <button type="submit" className="btn w-100 my-2 btn-warning">Login</button>
                        <a className="btn w-100 btn-dark" href="/signup">Sign Up</a>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;
