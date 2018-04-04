import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

class RestaurantResult extends Component{
    constructor(props){
        super(props);
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
                            <img className="card-img-top" src="https://whalebonemag.com/wp-content/uploads/2015/08/DSC_4647-Edit-1050x701.jpg" alt="Card image cap"></img>
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
                        </div>
                    )}
                </div>
            </div>

          </div>
        );
    }



}
export default RestaurantResult;
