import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantDetail from './restaurant_detail';
import registerServiceWorker from './registerServiceWorker';
import Ratings from './Ratings';

class RestaurantIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.match.params.id,
            restaurant: null,
        }

        console.log(this.state.id);
        this.databaseQuery(this.state.id);


    }

    render(){
        if(this.state.restaurant==null){
            return(<p>Loading</p>);
        }
        console.log(this.state.restaurant);

        return (
            <div>

                <RestaurantDetail restaurant={this.state.restaurant}/>
                <Ratings id={this.state.id}/>

            </div>
        );
    }

    databaseQuery(term){


        
        var search = `http://localhost:7000/restau/?id=${term}`;

        console.log(search);
        axios.get(search)
            .then((response) => {


                this.setState({
                restaurant: response.data[0]
                });

            })
            .catch( (error) => {
            console.log(error);
             });


    }

}

export default RestaurantIndex;
