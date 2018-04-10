import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import './css/nav.css';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import Modal from 'react-modal';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state={
            term : '',
            select: '',
            searchType:'',
            categoryDropdown: null,
            lowerDropdown: null,
            renderCards: false,
            input: 'lebanese',
        };
    }

    handleSearchBarChange = event => {
        console.log(event.target.value);
        this.setState({
            searchType: event.target.value,
        })
        if(event.target.value=='restaurantName'){
            this.props.onSearchTermChange('');
        }
        // else if(event.target.value=='raters'){
        //     this.props.current();

        // }
        else{
            this.props.current();
        }


    }

    handleInputSelect = event => {
        console.log(event.target.value);
        this.setState( {input: event.target.value} );
    }

    componentDidMount(){
        this.buildDropdown('category');
        this.buildDropdown('lower');
    }

    renderSearchOrDropdown(){
        if (this.state.searchType==='managerByCategory' || this.state.searchType==='restaurantType'){
            var list;
            if(this.state.dropdown != null){
                list = this.state.dropdown;
            }
            return(<select onChange={event => this.handleInputSelect(event)}
            className="input-group-prepend form-control w-75 border-right-0"
            >
                {this.state.categoryDropdown == null ? <option>Loading</option> :
                this.state.categoryDropdown.map((category, index)=>
                    <option >{category}</option>
                )}
            </select>);
        }
        else if(this.state.searchType==='lower'){
            return(<select onChange={event => this.handleInputSelect(event)}
            className="input-group-prepend form-control w-75 border-right-0"
            >
                {this.state.lowerDropdown == null ? <option>Loading</option> :
                this.state.lowerDropdown.map((lower, index)=>
                    <option >{lower}</option>
                )}
            </select>);
        }
        else if(this.state.searchType==='highest'){
            return(<select onChange={event => this.handleInputSelect(event)}
            className="input-group-prepend form-control w-75 border-right-0"
            >
                {this.state.categoryDropdown == null ? <option>Loading</option> :
                this.state.categoryDropdown.map((category, index)=>
                    <option >{category}</option>
                )}
            </select>);
        }
        else if (this.state.searchType==='restaurantName'){



            return(<input type="text"
                className="input-group-prepend form-control w-75 border-right-0"
                placeholder="Search here"
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)}>
            </input>);
        }

    }

    buildDropdown(type){
        if(type=='category'){
            axios.get(`http://localhost:7000/categories`)
            .then((response) => {

            this.setState({
                categoryDropdown: response.data
            });

        })
        }

        else if(type=='lower'){
            console.log('lower');
            axios.get(`http://localhost:7000/raternames/`)
            .then((response) => {

            console.log("IM INSIDE" + response.data);
            this.setState({
                lowerDropdown: response.data
            });

        })
        }


    }

    logout(){
        localStorage.removeItem('uid');
        this.forceUpdate();
    }

    delete(){
        const id = localStorage.getItem('uid');
        axios.get(`http://localhost:7000/deleteuser/?userid=${id}`)
        .then((response)=>{
            if(response.status === 200){
                localStorage.removeItem('uid')
                this.forceUpdate();
            }
        });
    }

    handleSelect = event => {
        console.log('target ' + event.target.value);
        this.setState({
            select: event.target.value,
            term: event.target.value
        });
    }

    handleSearch(){
        if (this.state.searchType == 'restaurantName'){


        }


        else {
            console.log("YOYOYO" + this.state.input);
            this.props.micsQuery(this.state.searchType, this.state.input);
            console.log("I AM REACHED");
            this.props.open();
        }
    }

    render(){
        // if(this.state.renderCards){

        //     () => this.setState({})
        // }
        console.log("I AM RENDERING");
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
                            <select onChange={event => this.handleSearchBarChange(event)} className="w-20 input-group form-control">
                                <option selected value="">Start Browsing</option>
                                <option value="restaurantName">Restaurants</option>
                                <option disabled value="locations">Locations</option>
                                <option value="raters"> Number of ratings of restaurants by raters (f)</option>
                                <option value="Jan">Not Rated in 2015 January (g)</option>
                                <option value="lower">Names and Dates of Restaurants with Staff Ratings Lower Than.. (h)</option>
                                <option value="highest">Type with Highest Food (i)</option>
                                <option disabled value="restaurantType">Restaurant Type</option>
                                <option value="managerByCategory">Managers Names For Each Category of Restaurant (c)</option>
                            </select>
                            <div className="input-group-append">
                                <button
                                    className="btn btn-dark border-left-0" type="button"
                                    onClick={() => this.handleSearch()}><FontAwesome name="search"/>
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
                                <button onClick={()=>{this.delete()}} className="nav-bar-btn btn btn-danger mx-2"><FontAwesome name="trash-alt"/>Delete My Account</button>
                                <button className="nav-bar-btn btn btn-warning mx-2"><FontAwesome name="user"/>My Profile</button>
                                <button onClick={()=>{this.logout()}} className="nav-bar-btn btn text-white btn-dark mr-2"> <FontAwesome name="sign-out"/>Logout</button>
                            </li>
                        }

                    </ul>
                    <Link to= '/deleterestau'><button className="nav-bar-btn btn btn-warning mx-2"><FontAwesome />Delete Restaurant</button></Link>
                    <Link to= '/addrestau'><button className="nav-bar-btn btn btn-warning mx-2"><FontAwesome />Add Restaurant</button></Link>
                    

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
