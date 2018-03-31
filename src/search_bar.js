import React, { Component } from 'react';
import ReactDOM from 'react-dom';


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
                <div className="navbar navbar-expand-md bg-light py-2 px-5">
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
                            <input type="text" 
                                className="form-control border-right-0" 
                                placeholder="Search Restaurants here"
                                value={this.state.term}
                                onChange={event => this.onInputChange(event.target.value)}>
                            </input>

                            <div className="input-group-append">
                                <button 
                                    className="btn btn-outline-primary border-left-0" type="button"
                                    onClick={() => this.props.onSearchTermChange(this.state.term)}>
                                </button>
                            </div>
                        </div>
                    </form>
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