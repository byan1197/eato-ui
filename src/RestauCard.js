import React, { Component } from 'react';
import './index.css';

class RestauCard extends Component {
  render() {
    return (
        <div className="card m-2 col-md-3 col-sm-6 p-0">
            <img className="card-img-top" src="https://whalebonemag.com/wp-content/uploads/2015/08/DSC_4647-Edit-1050x701.jpg" alt="Card image cap"></img>
            <div className="card-body">
              <h5 className="card-title">Restaurant Name</h5>
              <p className="card-text">this is just some example text haha this is great keep writing example text</p>
            </div>
        </div>
    );
  }
}

export default App;
