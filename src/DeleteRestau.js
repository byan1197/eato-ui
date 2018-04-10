import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import './css/Login.css';
import axios from 'axios';
import _ from 'lodash';

class DeleteRestau extends Component {

    state = {
        restaurants: null,
        redirect: null,
        delete: null,
    }
    
    componentDidMount(){
        console.log("test");
        axios.get(`http://localhost:7000/restau/`)
            .then((response) => {

            this.setState({
                restaurants: response.data
            });
            

        })

    }

    


    

    handleDelete = event => {

        axios.get(`http://localhost:7000/deleterestau?restauid=${this.state.delete}`)
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
    }


    handleSubmit = event => {
        event.preventDefault();

        var obj = _.find(this.state.restaurants, function (obj) { return obj.name === event.target.value; });
        
        // var toDelete = objrestaurantId;
        this.state.delete = obj.restaurantId;

       
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

        if(this.state.redirect){
            return(
                <Redirect to="/" />

            );
        }

        

        if(this.state.restaurants == null){
            return <p>Loading..</p>;
        }
        else{

        return(
        
        <div className="w-10 m-auto p-2 px-4 login-card card">
            <form name="Delete Restaurant" className="form-group" onSubmit={this.handleDelete}>
                                <h1>Delete</h1>
                                

                    <div  className="input-group mb-3">
                        <select onChange={this.handleSubmit} className="custom-select" id="inputGroupSelect02">
                        {this.state.restaurants == null ? <option>Loading</option> :
                        this.state.restaurants.map((restaurant, index)=>
                            <option >{restaurant.name}</option>
                        )}
                        </select>

                                </div>

                    <div className="row">
                        <div className="col-md-12 col-sm-16 pr-1 pl-3">
                             <button type="submit" className="btn w-100 my-2 btn-warning">Confirm</button>
                        </div>
                    </div>
            </form>
        </div>
        
        
        
        
        );
      
    }
}}
export default DeleteRestau;
