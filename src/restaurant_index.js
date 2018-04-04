import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantDetail from './restaurant_detail';
import registerServiceWorker from './registerServiceWorker';

class RestaurantIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            name : this.props.match.params.name,
        }
       
    }

    render(){

        return (
            <div>
                <RestaurantDetail name={this.state.name}/>
            </div>
        );
    }

    databaseQuery(term){
        

    }

}

export default RestaurantIndex;
