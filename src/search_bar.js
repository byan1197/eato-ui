import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import './css/nav.css';

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state={
            term : ' '
        };

    }

    render(){
        return (
            <div className="Nav">
                <div className="navbar navbar-expand-md py-2 px-5">
                <a href="/" className="navbar-brand">
                    <img id="logo-img" src={require('./img/eatO-logo-final.png')} />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar5">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse justify-content-stretch" id="navbar5">
                    <form className="ml-3 my-auto d-inline w-100">
                        <div className="input-group">
                            <input type="text"
                                className="form-control border-right-0"
                                placeholder="Search Restaurants here"
                                value={this.state.term}
                                onChange={event => this.onInputChange(event.target.value)}>
                            </input>

                            <div className="input-group-append">
                                <button
                                    className="btn btn-dark border-left-0" type="button"
                                    onClick={() => this.props.onSearchTermChange(this.state.term)}> GO
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav">
                        {
                            (localStorage.getItem('uid') == null) ?
                            <li className="nav-item active">
                            <a className="btn btn-dark mx-2" href="/login">Sign In<span className="sr-only"></span>
                            </a>
                        </li> : null
                        }
                        
                    </ul>
                </div>
                </div>
            </div>
        );

    }

    onInputChange(term){
        this.setState({ term });
    }
}

export default SearchBar;
