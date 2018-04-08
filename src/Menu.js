import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantDetail from './restaurant_detail';
import registerServiceWorker from './registerServiceWorker';
import Ratings from './Ratings';
import Switches from './switch';
import Switch from 'material-ui/Switch';
import JSONToTable from './JSONToTable';

class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            restauId: '',
            menu: null,
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:7000/getmenu/?restId=${this.props.id}`)
        .then((response) => {

            this.setState({ menu : response.data })

        })
    }

    render(){
        
        if (this.state.menu == null) return <p>Loading</p>

        else{
            return JSONToTable(this.state.menu);
        }

        


    }

}
export default Menu;