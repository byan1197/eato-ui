import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import './css/nav.css';
import FontAwesome from 'react-fontawesome';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state={
            term : '',
            select: '',
            searchType:'restaurantName',
        };
    }

    handleSearchBarChange = event => {
        this.setState({
            searchType: event.target.value,
        })
    }

    renderSearchOrDropdown(){
        if (this.state.searchType==='managerByCategory'){
            return(<select
            className="input-group-prepend form-control w-75 border-right-0"
            >
                <option>testtest</option>
            </select>);
        }
        else if (this.state.searchType==='restaurantType'){
            return(<select
            className="input-group-prepend form-control w-75 border-right-0"
            >
                <option>testtest</option>
            </select>);
        }
        else {
            return(<input type="text"
                className="input-group-prepend form-control w-75 border-right-0"
                placeholder="Search here"
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)}>
            </input>);
        }
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
        console.log(this.state.searchType);
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
                            {this.renderSearchOrDropdown()}
                            <select onChange={this.handleSearchBarChange} className="w-20 input-group form-control">
                                <option selected value="restaurantName">Restaurants</option>
                                <option value="locations">Locations</option>
                                <option value="raters">Raters</option>
                                <option value="restaurantType">Restaurant Type</option>
                                <option value="managerCategory">Manager By Category</option>
                                <option value="restaurantsLowerThan">Restaurants Lower Than:</option>
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
                            </li>:
                            <li className="nav-btn-group nav-item active">
                                <button className="nav-bar-btn btn btn-warning mx-2"><FontAwesome name="user"/>My Profile</button>
                                <button onClick={()=>{this.logout()}} className="nav-bar-btn btn text-white btn-dark mr-2"> <FontAwesome name="sign-out"/>Logout</button>
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
