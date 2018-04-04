import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import './css/restaurant_detail.css';

class RestaurantDetail extends Component{
    constructor(props){
        super(props);
    }
    renderStars(num){

        
    }

    render(){
       
        return(
            <div>
                <h1>{this.props.name}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                        {/* <div class="card bg-dark text-white"> */}
                            <img class="card-img" src="https://logopond.com/logos/7b5b4ac4081ca3a69d3944470535efd7.png" alt="Card image" />
                            <div class="card-img-overlay">
                              
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}
export default RestaurantDetail;
