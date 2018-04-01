import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantResult from './restaurant_result';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'

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
                <Router>
                    <div>
                        <Route path="/" exact render={
                            <RestaurantResult rest={this.state.list}/>
                        }/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                    </div>
                </Router>
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
