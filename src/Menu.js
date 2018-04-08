import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantDetail from './restaurant_detail';
import registerServiceWorker from './registerServiceWorker';
import Ratings from './Ratings';
import Switches from './switch';
import Switch from 'material-ui/Switch';
import Modal from 'react-modal';
import JSONToTable from './JSONToTable';

import StarRatingComponent from 'react-star-rating-component';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            restauId: '',
            menu: null,
            beverageMenu: null,
            mainMenu: null,
            starterMenu: null,
            dessertMenu: null,
            modalIsOpen: false,
            list: null,
        }
        this.openModal = this.openModal.bind(this);

        this.closeModal = this.closeModal.bind(this);
    }

    openModal(id) {
        axios.get(`http://localhost:7000/menuitemid/?id=${id}`)
            .then((response) => {
                this.setState({
                    list: response.data
                });

            })
        this.setState({modalIsOpen: true});
        console.log("OPEN");
      }



    closeModal() {
        this.setState({modalIsOpen: false});
    }


    componentDidMount(){
        axios.get(`http://localhost:7000/getmenu/?restId=${this.props.id}`)
        .then((response) => {
            this.setState({ menu : response.data })
            this.getMenuInCats();
        })
    }

    getMenuInCats(){
        const allCats = ['BEVERAGE', 'DESSERT', 'STARTER', 'MAIN'];
        const allItems = this.state.menu;

        var beverageItems = [];
        var starterItems = [];
        var dessertItems = [];
        var mainItems = [];

        for (var i in allItems){
            console.log(allItems);
            if (allItems[i]['category'] == allCats[0]) {
                //BEVERAGE
                beverageItems.push(allItems[i]);
            }
            else if (allItems[i]['category'] == allCats[1]) {
                //dessert
                dessertItems.push(allItems[i]);
            }
            else if (allItems[i]['category'] == allCats[2]) {
                //starter
                starterItems.push(allItems[i]);
            }
            else if (allItems[i]['category'] == allCats[3]) {
                //main
                mainItems.push(allItems[i]);
            }
        }

        this.setState({
            beverageMenu: beverageItems,
            mainMenu: mainItems,
            starterMenu: starterItems,
            dessertMenu: dessertItems,
        })
        console.log("heyo im here");
        console.log(this.state.beverageMenu);
    }

    render(){




        const beverageData = this.state.beverageMenu;
        const starterData = this.state.starterMenu;
        const mainData = this.state.mainMenu;
        const dessertData = this.state.dessertMenu;
        if (beverageData == null || starterData == null || mainData == null || dessertData == null){
            return (<h1 className="text-secondary">Loading Menu Items...</h1>);
        }
        if (this.state.menu == null) return <p>Loading</p>
        else{
            return(
                

                <div>

                <Modal
                    isOpen={this.state.modalIsOpen}

                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <div>{this.state.list == null ? <p>HOL UP</p> :JSONToTable(this.state.list)} </div>

                </Modal>
                <div className="container">
                    <div className="row">
                        <div className="p-5 card">
                            <h1>Mains</h1>
                            <div className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>View Ratings</th>
                                        <th>Comments</th>
                                        <th>Rate</th>
                                        <th>Submit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.mainMenu.map((row, index)=>
                                        <tr key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.price}</td>
                                            <td>{row.description}</td>
                                            <td><button onClick={() => this.openModal(row.itemId)} className="btn btn-outline-primary">View</button></td>
                                            <td><textarea className="form-control w-100, h-100"></textarea></td>
                                            <td>
                                                <StarRatingComponent
                                                    name="foodRating"/* name of the radio input, it is required */
                                                    value={0} /* number of selected icon (`0` - none, `1` - first) */
                                                    // onStarClick={this.onFoodStarClick.bind(this)}
                                                />
                                            </td>
                                            <td><button className="btn btn-outline-success">Submit</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="p-5 card">
                            <h1>Starters</h1>
                            <div className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>View Ratings</th>
                                        <th>Comments</th>
                                        <th>Rate</th>
                                        <th>Submit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {starterData.map((row, index)=>
                                        <tr key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.price}</td>
                                            <td>{row.description}</td>
                                            <td><button onClick={() => this.openModal(row.itemId)} className="btn btn-outline-primary">View</button></td>
                                            <td><textarea className="form-control w-100, h-100"></textarea></td>
                                            <td>
                                                <StarRatingComponent
                                                    name="foodRating"/* name of the radio input, it is required */
                                                    value={0} /* number of selected icon (`0` - none, `1` - first) */
                                                    // onStarClick={this.onFoodStarClick.bind(this)}
                                                />
                                            </td>
                                            <td><button className="btn btn-outline-success">Submit</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="p-5 card">
                            <h1>Starters</h1>
                            <div className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>View Ratings</th>
                                        <th>Comments</th>
                                        <th>Rate</th>
                                        <th>Submit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {beverageData.map((row, index)=>
                                        <tr key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.price}</td>
                                            <td>{row.description}</td>
                                            <td><button onClick={() => this.openModal(row.itemId)} className="btn btn-outline-primary">View</button></td>
                                            <td><textarea className="form-control w-100, h-100"></textarea></td>
                                            <td>
                                                <StarRatingComponent
                                                    name="foodRating"/* name of the radio input, it is required */
                                                    value={0} /* number of selected icon (`0` - none, `1` - first) */
                                                    // onStarClick={this.onFoodStarClick.bind(this)}
                                                />
                                            </td>
                                            <td><button className="btn btn-outline-success">Submit</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="p-5 card">
                            <h1>Starters</h1>
                            <div className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>View Ratings</th>
                                        <th>Comments</th>
                                        <th>Rate</th>
                                        <th>Submit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dessertData.map((row, index)=>
                                        <tr key={index}>
                                            <td>{row.name}</td>
                                            <td>${row.price}</td>
                                            <td>{row.description}</td>
                                            <td><button onClick={() => this.openModal(row.itemId)} className="btn btn-outline-primary">View</button></td>
                                            <td><textarea className="form-control w-100, h-100"></textarea></td>
                                            <td>
                                                <StarRatingComponent
                                                    name="foodRating"/* name of the radio input, it is required */
                                                    value={0} /* number of selected icon (`0` - none, `1` - first) */
                                                    // onStarClick={this.onFoodStarClick.bind(this)}
                                                />
                                            </td>
                                            <td><button className="btn btn-outline-success">Submit</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        }




    }

}
export default Menu;
