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
            id : this.props.id,
            restaurant: null,
            locations: null,
        }

        console.log(this.state.id);

        this.databaseQuery('restau','id',this.state.id);
        this.databaseQuery('location','restauId',this.state.id);
       


    }

    render(){
        if(this.state.restaurant == null || this.state.locations == null){
            return(<p>Loading</p>);
        }
        console.log(this.state.restaurant);

        return (
            <div>
                <RestaurantDetail restaurant={this.state.restaurant} locations = {this.state.locations}/>

                 <Ratings name={this.state.name}/> 


            </div>
        );
    }


    databaseQuery(type,param,term){
        
        var search = `http://localhost:7000/${type}/?${param}=${term}`;
        console.log(search);
        console.log(search);
        axios.get(search)
            .then((response) => {
                
                if(type == 'restau'){
                    this.setState({
                        restaurant: response.data[0]
                        });
                }

                else if(type == 'location'){
                    this.setState({
                        locations: response.data
                        });
                    console.log(response.data);
                }
                

            })
            .catch( (error) => {
            console.log(error);
             });


    }

}

export default RestaurantIndex;
