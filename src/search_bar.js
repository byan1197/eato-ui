import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import './css/nav.css';
import FontAwesome from 'react-fontawesome';

class SearchBar extends Component{
    constructor(props){
        super(props);
console.log(localStorage.getItem('uid'));
        this.state={
            term : '',
            select: '',
        };
    }

    logout(){
        localStorage.removeItem('uid');
        this.forceUpdate();
    }

    handleSelect = event => {
        console.log('target ' + event.target.value);
        this.setState({
            select: event.target.value,
            term: event.target.value
        });
    }

    render(){
        if(this.props.allItems == []){
            return null;
        }

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
                    <form className="ml-auto my-auto d-inline w-100">
                        <div className="input-group">

                            <div className="input-group-append">
                                <select onChange={this.handleSelect}  data-live-search="true" className="custom-select" id="inputGroupSelect02">
                                    <option value="" selected></option>
                                    {this.props.allItems.map((restaurant, index) => <option key={index} value={restaurant}>{restaurant}</option>)}
                                </select>
                            </div>
                            <input type="text"
                                className="input-group-prepend form-control w-75 border-right-0"
                                placeholder="Search Restaurants here"
                                value={this.state.term}
                                onChange={event => this.onInputChange(event.target.value)}>
                            </input>
                            <select className="w-20 input-group form-control">
                                <option selected>Choose...</option>
                                <option value="1">Restaurants</option>
                                <option value="2">Locations</option>
                                <option value="3">Raters</option>
                            </select>
                            <div className="input-group-append">
                                <button
                                    className="btn btn-dark border-left-0" type="button"
                                    onClick={() => this.props.onSearchTermChange(this.state.term)}><FontAwesome name="search"/>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav">
                        {
                            (!localStorage.getItem('uid')) ?
                            <li className="nav-item active">
                                <a className="btn btn-warning mx-2" href="/login">Log In<FontAwesome name="sign-in-alt"/><span className="sr-only"></span>
                                </a>
                            </li>:<li className="nav-item active">
                                <button onClick={()=>{this.logout()}} className="btn text-white btn-dark mx-2">Logout<FontAwesome name="sign-out-alt"/></button>
                            </li>                     
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
