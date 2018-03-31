import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantResult from './restaurant_result';
import registerServiceWorker from './registerServiceWorker';

class App extends Component{
    constructor(props){
        super(props);
        
        this.databaseQuery(' ');
        
        
        
        this.state={
            searchTerm: null,
            list: []
            

        };
    
        
    }

    


    render(){
        
        return (
            <div>
                <SearchBar onSearchTermChange={searchTerm => this.databaseQuery(searchTerm)}/>
                <RestaurantResult rest={this.state.list} />
            </div>
        );
    }

    databaseQuery(term){
        var search;
        if(term == ' '){
            search = 'http://localhost:7000/restau/';
        } else {
            search = `http://localhost:7000/restau/?name=${term}`;
        }
        console.log(search.length);
        axios.get(search)
            .then((response) => {
                console.log("response", response);
                this.setState({
                list: response.data
                });
           
            })
            .catch( (error) => {
            console.log(error);
             });  
        
    }

}
    

ReactDOM.render(<App />, document.getElementById('root'));





registerServiceWorker();
