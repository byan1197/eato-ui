import React, { Component } from 'react';
import axios from 'axios';
import './css/comment.css'
import FontAwesome from 'react-fontawesome';

class Ratings extends Component {
    constructor(props){
        super(props);
        this.state = {
            ratingList:[],
            changed: false,
        };
        this.getRatings();
        console.log(this.state.ratingList);
    }

    getRatings(){
        axios.get('http://localhost:7000/rate/?restid=2')
        .then((response)=>{
            console.log(response);
            this.setState({
                ratingList: response.data,
                changed: true,
            });
            console.log('from getRatings()');
            console.log(this.state.ratingList);
        });
    }

    showRep(rep){
        if (rep > 50){
            return(
                <p className="text-success">Reputation: {rep}%</p>
            );
        } else {
            return(
                <p className="text-danger">Reputation: {rep}%</p>
            );
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
        if(this.state.changed){
            console.log("state has been changed.");
            console.log(this.state.ratingList);
        }

        var ratings = this.state.ratingList;
        return (

            <div className="card m-4 p-4">
                <h4 className="text-secondary">Ratings</h4>
                {
                    ratings.map((rating, index)=>
                        <div className="my-1 card comment-card">
                          <div className="row">
                            <div className="align-middle col-md-2">
                                <h5>{rating.username}</h5>
                                <img className="mx-auto" id="logo-img" src={require('./img/profile.png')} />
                                {this.showRep(rating.reputation)}
                            </div>
                            <div className="col-md-7">
                                <p>{rating.comments}</p>
                            </div>
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        Food:
                                        <p className="text-warning">{this.renderStars(rating.food)}</p>
                                    </div>
                                    <div className="col-md-6">
                                        Mood:
                                        <p className="text-warning">{this.renderStars(rating.mood)}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        Price:
                                        <p className="text-warning">{this.renderStars(rating.price)}</p>
                                    </div>
                                    <div className="col-md-6">
                                        Staff:
                                        <p className="text-warning">{this.renderStars(rating.staff)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                                <a className="vote-button"><h1 className="text-success"><FontAwesome name="thumbs-up"/></h1></a>
                                <a className="vote-button"><h1 className="text-danger"><FontAwesome name="thumbs-down"/></h1></a>
                            </div>
                          </div>
                        </div>
                    )
                }

            </div>
        );
    }

}

export default Ratings;
