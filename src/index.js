import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchBar from './search_bar';
import RestaurantIndex from './restaurant_index';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login'
import Signup from './Signup'
import App from './app';
import Homepage from './Homepage';
import AddRestau from './AddRestau';
import DeleteRestau from './DeleteRestau';

import Ratings from './Ratings';

ReactDOM.render(

    <BrowserRouter>
      <div>
        <Switch>

          <Route path="/test" component={Homepage}/>
          <Route path="/restaurant-index/:id" component={RestaurantIndex}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/deleteRestau" component={DeleteRestau}/>
          <Route path="/addRestau" component={AddRestau}/>

          <Route path="/" component={App} />

        </Switch>
      </div>
    </BrowserRouter>

  , document.querySelector('.root'));

registerServiceWorker();
