import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const Stars = (num) => {
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
export default Stars;