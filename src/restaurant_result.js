import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import RestaurantDetail from './restaurant_detail';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';

class RestaurantResult extends Component{
    constructor(props){
        super(props);

        this.state={
            goTo: null,
        }
    }
    renderStars(num){

        if (num == 0){
            return 'None';
        }

        var fullStars = Math.floor(num);
        var halfStar = (num-fullStars) != 0;
        var stars=[];

        for (var i = 0 ; i < fullStars; i++){
            stars.push(<FontAwesome name="star"/>);
        }
        if (halfStar) {
            stars.push(<FontAwesome name="star-half"/>);
        }
        return stars;
    }

    

    render(){
        if(this.state.goTo != null){
            var url = "/restaurant-index/" + this.state.goTo;
            console.log(url);
            return(
                <Redirect to={url} />
                
            );
        }
        var restau = this.props.rest;
        if(restau == null){
            return <p>LOADING</p>;
        }
        return(

<div className="RestaurantList">
    <div className="container-fluid">
        <div className="row">

            {restau.map((restaurant, index) =>

                <div key={index} className="card m-4 col-md-2 col-sm-6 p-0">

                <a onClick={() => this.setState({ goTo:restaurant.name })}>
                    <img className="card-img-top food-img" src={restaurant.picUrl}></img>
                        <div className="card-body">
                        <h5 className="card-title">{restaurant.name}</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">Food: {this.renderStars(restaurant.foodRating)}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">Price: {this.renderStars(restaurant.priceRating)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">Mood: {this.renderStars(restaurant.moodRating)}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">Staff: {this.renderStars(restaurant.staffRating)}</p>
                                </div>
                            </div>
                        </div>
                </a>
                </div>

            )}
        </div>
    </div>

</div>
        );
    }



}
export default RestaurantResult;
