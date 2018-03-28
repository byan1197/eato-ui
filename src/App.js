import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav'
import RestaurantList from './RestaurantList';

class App extends Component {
    constructor(props){
        super();
    }
  render() {
    return (
        <div>
            <div className='nav'></div>
            <div className='restaurant-list'></div>
            <Nav />
            <RestaurantList />
        </div>
    );
  }
}

export default App;
