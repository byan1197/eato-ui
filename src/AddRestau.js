import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import './css/Login.css';
import axios from 'axios';

class AddRestau extends Component {

    state = {
        name: '',
        type: '',
        url: '',
        urlFood: '',
        urlLogo: '',
        redirect: '',
        
    }

    handleUrl = event => {
        this.setState({url: event.target.value});
    }

    handleFoodPic = event => {
        this.setState({urlPic: event.target.value});
    }
    handleLogo = event => {
        this.setState({urlLogo: event.target.value});
    }

    
    handleType = event => {
        this.setState({type: event.target.value});
    }

    handleName = event => {
        this.setState({name: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const restau = {
            name: this.state.name,
            type: this.state.type,
            url: this.state.url,
            urlPic: this.state.urlPic,
            urlLogo: this.state.urlLogo,
        }
      

        axios.post('http://localhost:7000/restau/', restau)
        .then(response => {
            console.log(response.status);
            if(response.status == 200){
                this.setState({
                    redirect:true,
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

        if(this.state.redirect==true){
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
                                <h1>Add Restaurant</h1>
                                <input onChange={this.handleName} ref="name" className="mb-2 form-control" id="name" placeholder="Name"required></input>
                                <input onChange={this.handleType} ref="type" type="type" className="mb-2 form-control" id="type" placeholder="Type"required></input>
                                <input onChange={this.handleUrl} ref="url"  className="mb-2 form-control" id="url" placeholder="URL"required></input>
                                <input onChange={this.handleFoodPic}  type="food" className="mb-2 form-control" id="foodpic" placeholder="Food pic"></input>
                                <input onChange={this.handleLogo} ref="logo"  className="mb-2 form-control" id="logo" placeholder="Logo"></input>

                            

                                <div className="row">
                                    <div className="col-md-12 col-sm-16 pr-1 pl-3">
                                        <button type="submit" className="btn w-100 my-2 btn-warning">Submit</button>
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
export default AddRestau;
