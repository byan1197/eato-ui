import React, { Component } from 'react';
import './App.css';

class Nav extends Component {

    constructor(props){
        super();
        this.state = {
            uid: -1
        };
    }

    componentDidMount(){
        fetch('http://localhost:7000/uli')
        .then((response) => {
            this.setState({
                uid: response
            })
        })
    }

    render() {
      return (
        <div className="Nav">
            <div className="navbar navbar-expand-md navbar-dark bg-dark">
            <a href="/" className="navbar-brand">eatOttawa</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar5">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse justify-content-stretch" id="navbar5">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Link <span className="sr-only">Browse</span></a>
                    </li>
                </ul>
                <form className="ml-3 my-auto d-inline w-100">
                    <div className="input-group">
                      <input type="text" className="form-control border-right-0" placeholder="Search Restaurants here"></input>
                      <div className="input-group-append">
                        <button className="btn btn-outline-primary border-left-0" type="button"><span className="glyphicon glyphicons-search"></span></button>
                      </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
      );
    }
}

export default Nav;
