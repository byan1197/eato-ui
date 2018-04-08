import React, { Component } from 'react';
import axios from 'axios';
import './css/comment.css'
import FontAwesome from 'react-fontawesome';
import StarRatingComponent from 'react-star-rating-component';

// onStarClick={} /* on icon click handler */

class Ratings extends Component {
    constructor(props){
        super(props);
        this.state = {
            food: 0,
            mood: 0,
            price: 0,
            staff: 0,
            comments:'',
            ratingList:[],
            restId: this.props.id, //MUST CHANGE THIS LATER!!!
            rerender: false,
        };
        this.getRatings();
        console.log(this.state.ratingList);
    }

    handleComment = event =>{
        this.setState({
            comments:event.target.value,
        })
    }

    onFoodStarClick(nextValue, prevValue, name) {
      console.log(nextValue);
      this.setState({
          food:nextValue,
      });
    }
    onMoodStarClick(nextValue, prevValue, name) {
      console.log(nextValue);
      this.setState({
          mood:nextValue,
      });
    }
    onStaffStarClick(nextValue, prevValue, name) {
      console.log(nextValue);
      this.setState({
          staff:nextValue,
      });
    }
    onPriceStarClick(nextValue, prevValue, name) {
      console.log(nextValue);
      this.setState({
          price:nextValue,
      });
    }

    submitRating(){
        var localuserid;
        if (typeof localStorage.getItem('uid') != typeof 1){
            localuserid = parseInt(localStorage.getItem('uid'));
        }
        else {
            localuserid = localStorage.getItem('uid');
        }
        const newRating = {
            userID: localuserid,
            date: null,
            price: this.state.price,
            food: this.state.food,
            mood: this.state.mood,
            staff: this.state.staff,
            comments: this.state.comments,
            restaurantId: parseInt(this.state.restId),
        }
        console.log(newRating);
        axios.post('http://localhost:7000/rate/', newRating)
        .then((response)=>{
            console.log(response);
        });
        this.getRatings();
        this.setState({
            food: 0,
            mood: 0,
            price: 0,
            staff: 0,
            comments:'',
        })
    }

    getRatings(){
        axios.get(`http://localhost:7000/rate/?restid=${this.state.restId}`)
        .then((response)=>{
            console.log(response);
            this.setState({
                ratingList: response.data,
            });
        });
    }

    showRep(rep){
        if (rep > 50){
            return(
                <p className="text-success">Reputation: <b>{rep}%</b></p>
            );
        } else {
            return(
                <p className="text-danger">Reputation: <b>{rep}%</b></p>
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

    loggedInUsersOnly(){
        if (localStorage.getItem('uid') != null){
            return(
                <div className="mb-1 submit-your-own px-5 w-100">
                    <p><b>Submit your own review:</b></p>
                    <div className="row mb-2">
                        <div className="col-md-5">
                            <textarea defaultValue={this.state.comments} onChange={this.handleComment} className="h-100 form-control w-100"></textarea>
                        </div>
                        <div className="col-md-5">
                            <p><b>Rate the service:</b></p>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Food:</p>
                                    <StarRatingComponent
                                        name="foodRating"/* name of the radio input, it is required */
                                        value={this.state.food} /* number of selected icon (`0` - none, `1` - first) */
                                        onStarClick={this.onFoodStarClick.bind(this)}
                                    />
                                    <p>Price:</p>
                                    <StarRatingComponent
                                        name="priceRating"/* name of the radio input, it is required */
                                        value={this.state.price} /* number of selected icon (`0` - none, `1` - first) */
                                        onStarClick={this.onPriceStarClick.bind(this)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <p>Staff:</p>
                                    <StarRatingComponent
                                        name="staffRating"/* name of the radio input, it is required */
                                        value={this.state.staff} /* number of selected icon (`0` - none, `1` - first) */
                                        onStarClick={this.onStaffStarClick.bind(this)}
                                    />
                                    <p>Mood:</p>
                                    <StarRatingComponent
                                        name="moodRating"/* name of the radio input, it is required */
                                        value={this.state.mood} /* number of selected icon (`0` - none, `1` - first) */
                                        onStarClick={this.onMoodStarClick.bind(this)}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="col-md-1">
                            <button type="submit" onClick={()=> this.submitRating()} className="my-auto btn btn-outline-success">Submit</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="bg-secondary pb-1 mb-1 submit-your-own px-5 w-100">
                    <p><b>Submit your own review:</b></p>
                    <div className="row mb-2">
                        <div className="col-md-11">
                            <textarea disabled className="form-control w-100">Please login to submit a review.</textarea>
                        </div>
                        <div className="col-md-1">
                            <button type="submit" disabled className="my-auto btn btn-outline-success">Submit</button>
                        </div>
                    </div>
                </div>
            );
        }

    }

    upvote(raterid){
        console.log('upvoted!');
        axios.get(`http://localhost:7000/upvote-rater/?&raterid=${raterid}`)
        this.getRatings();
    }

    downvote(raterid){
        console.log('downvoted!');
        axios.get(`http://localhost:7000/downvote-rater/?raterid=${raterid}`)
        this.getRatings();
    }

    render(){
        if(this.state.changed){
            console.log("state has been changed.");
            console.log(this.state.ratingList);
        }
        const repRater= {
           display: "inline-flex"
        }

        var ratings = this.state.ratingList;
        if (ratings.length ==0){
            return(
                <div className="row">
                    <div className="col-md-12">
                        <div className="card m-4 p-4">
                            <div className="card-header">
                                <h4 className="text-secondary">Ratings</h4>
                                {
                                    this.loggedInUsersOnly()
                                }
                            </div>
                            <h4 className="text-center text-secondary">There seems to be no reviews...</h4>
                            <p className="text-center"><b>write one now!</b></p>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card m-4 p-4">
                        <div className="card-header">
                            <h4 className="text-secondary">Ratings</h4>
                            {
                                this.loggedInUsersOnly()
                            }
                        </div>
                        {
                            ratings.map((rating, index)=>
                                <div key={index} className="my-1 px-5 py-2 card comment-card">
                                  <div className="row">
                                    <div className="col-md-2">
                                        <h5>{rating.username}<FontAwesome name="user"/></h5>
                                        {this.showRep(rating.reputation)}
                                    </div>
                                    <div className="col-md-5">
                                        <p>{rating.comments==''?'No comment.':rating.comments}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                Food:
                                                <StarRatingComponent
                                                    name="foodDisplay"/* name of the radio input, it is required */
                                                    value={rating.food} /* number of selected icon (`0` - none, `1` - first) */
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                Mood:
                                                <StarRatingComponent
                                                    name="moodDisplay"/* name of the radio input, it is required */
                                                    value={rating.mood} /* number of selected icon (`0` - none, `1` - first) */
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                Price:
                                                <StarRatingComponent
                                                    name="priceDisplay"/* name of the radio input, it is required */
                                                    value={rating.price} /* number of selected icon (`0` - none, `1` - first) */
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                Staff:
                                                <StarRatingComponent
                                                    name="staffDisplay"/* name of the radio input, it is required */
                                                    value={rating.staff} /* number of selected icon (`0` - none, `1` - first) */
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <p>Was this helpful?</p>
                                        <div className="" style={repRater}>
                                            <a onClick={()=>{this.upvote(rating.userid)}} className="mx-2 text-success upvote-button"><h5><FontAwesome name="thumbs-up"/></h5></a>
                                            <a onClick={()=>{this.downvote(rating.userid)}} className="mx-2 text-danger downvote-button"><h5><FontAwesome name="thumbs-down"/></h5></a>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        );
    }

}

export default Ratings;
