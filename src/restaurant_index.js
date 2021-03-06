import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantDetail from './restaurant_detail';
import registerServiceWorker from './registerServiceWorker';
import Ratings from './Ratings';
import Switches from './switch';
import Switch from 'material-ui/Switch';
import Menu from './Menu';


class RestaurantIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.match.params.id,
            restaurant: null,
            locations: null,
            checkedA: false,
            checkedB: false,
        }

        console.log(this.state.id);

        this.databaseQuery('restau','id',this.state.id);
        this.databaseQuery('location','restauId',this.state.id);



    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });

      };

    render(){
        console.log(this.state.checkedB);
        const margin={
            margin:"5% 20% 5% 20%",
           //   backgroundColor: "rgba(255,255,255,0)",
           //  border: "none",

        }
        if(this.state.restaurant == null || this.state.locations == null){
            return(<p>Loading</p>);
        }


        return (

            <div style={margin}>
                <RestaurantDetail restaurant={this.state.restaurant} locations = {this.state.locations}/>
                <div className="card">
                <Switch
                onChange={this.handleChange('checkedB')}
                value="checkedA"
                color="Secondary"
                /><p>Show/Hide Menu</p>
                </div>

                {this.state.checkedB ? <Menu id={this.state.id} /> : null}
                <Ratings id={this.state.id}/>
            </div>
        );
    }


    databaseQuery(type,param,term){

        var search = `http://localhost:7000/${type}/?${param}=${term}`;
        console.log("this is da search " + search);

        axios.get(search)
            .then((response) => {

                if(type == 'restau'){
                    this.setState({
                        restaurant: response.data[0]
                        });
                }

                else if(type == 'location'){
                    this.setState({
                        locations: response.data
                        });
                    console.log(response.data);
                }


            })
            .catch( (error) => {
            console.log(error);
             });


    }

}

export default RestaurantIndex;
