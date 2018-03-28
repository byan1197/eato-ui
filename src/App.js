import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props){
        super();
        this.state = {
            restaurants: []
        };
    }

    componentDidMount(){
        fetch('http://localhost:7000/')
        .then((response) => response.json())
        .then((result)=>{
            this.setState({
                restaurants: result
            })
            console.log(result)
        })
    }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
            <div className="row">

                {this.state.restaurants.map((restaurant, index) =>
                    <div key={index} className="card m-2 col-md-3 col-sm-6 p-0">
                        <img className="card-img-top" src="https://whalebonemag.com/wp-content/uploads/2015/08/DSC_4647-Edit-1050x701.jpg" alt="Card image cap"></img>
                        <div className="card-body">
                          <h5 className="card-title">{restaurant.name}</h5>
                          <p className="card-text">this is just some example text haha this is great keep writing example text</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>
    );
  }
}

export default App;
