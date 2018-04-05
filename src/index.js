import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchBar from './search_bar';
import RestaurantIndex from './restaurant_index';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login'
import Signup from './Signup'
import App from './app';

import Ratings from './Ratings';



ReactDOM.render(
    
    <BrowserRouter>
      <div>
        <Switch>

          <Route path="/test" component={Ratings}/>
          <Route path="/restaurant-index/:name" component={RestaurantIndex}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>

          <Route path="/" component={App} />

        </Switch>
      </div>
    </BrowserRouter>

  , document.querySelector('.root'));




window.onbeforeunload = function() {
    localStorage.clear();
}

registerServiceWorker();
