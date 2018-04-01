import React, { Component } from 'react';
import logo from './logo.svg';
// import './css/Login.css';

class Signup extends Component {
    handleSubmit(data){
        console.log(data);
    }
    render(){
        return(
            <div className="login-container text-white">
                <div className="w-10 m-auto p-2 px-4 login-card card">
                    <form name="login" className="form-group" onSubmit={this.handleSubmit}>
                        <h1>Sign Up</h1>
                    </form>
                </div>
            </div>
        )
    }
}
export default Signup;
