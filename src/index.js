import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantResult from './restaurant_result';
import registerServiceWorker from './registerServiceWorker';

class App extends Component{
    constructor(props){
        super(props);
        
        
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
        
    
        axios.get('http://localhost:7000/restau/?name=' + term)
            .then((response) => {
                console.log("response", response);
                this.setState({
                list: response.data
                });
           
            })
            .catch( (error) => {
            console.log(error);
             });  
        // .then((response) => response.json())
        // .then((result)=>{
        //     this.setState({
        //         list: result
        //     })
        //     console.log(result)
        // })
    }

}
    

ReactDOM.render(<App />, document.getElementById('root'));





registerServiceWorker();
