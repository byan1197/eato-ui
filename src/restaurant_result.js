import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import RestaurantDetail from './restaurant_detail';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import Stars from './stars';
import StarRatingComponent from 'react-star-rating-component';

class RestaurantResult extends Component{
    constructor(props){
        super(props);

        this.state={
            goTo: null,
        }
    }




    render(){
        const styles = {



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

                <div key={index} className="card restau-card m-4 col-md-2 col-sm-6 p-0">
             <Link to = {`/restaurant-index/${restaurant.restaurantId}`} >
                    <img className="card-img-top food-img" src={restaurant.picUrl == (null || "" || '') ? "http://prachyanat.org/wp-content/uploads/2014/08/placeholder1-300x300.jpg" : restaurant.picUrl}></img>
                    </Link>
                        <div className="card-body" >
                        <h5 className="card-title">{restaurant.name}</h5>
                            <div className="row" >
                                <div className="col-md-6">
                                    <p className="card-text card-rating" >Food:<br/>
                                    <StarRatingComponent
                                        name="moodRating"/* name of the radio input, it is required */
                                        value={restaurant.foodRating} /* number of selected icon (`0` - none, `1` - first) */
                                        editing={false}
                                    />
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text card-rating">Price:<br/>
                                    <StarRatingComponent
                                        name="moodRating"/* name of the radio input, it is required */
                                        value={restaurant.priceRating} /* number of selected icon (`0` - none, `1` - first) */
                                        editing={false}
                                    />
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text card-rating">Mood:<br/>
                                    <StarRatingComponent
                                        name="moodRating"/* name of the radio input, it is required */
                                        value={restaurant.moodRating} /* number of selected icon (`0` - none, `1` - first) */
                                        editing={false}
                                    />
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text card-rating">Staff:<br/>
                                    <StarRatingComponent
                                        name="moodRating"/* name of the radio input, it is required */
                                        value={restaurant.staffRating} /* number of selected icon (`0` - none, `1` - first) */
                                        editing={false}
                                    />
                                    </p>
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
