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
            itemRatingComment: '',
            itemRatingValue: 0,
            itemRatingId:-10,
            modalIsOpen: false,
            list: null,
        }
        this.openModal = this.openModal.bind(this);

        this.closeModal = this.closeModal.bind(this);
    }

    openModal(id, forPost) {
        if (!forPost) {
            axios.get(`http://localhost:7000/menuitemid/?id=${id}`)
                .then((response) => {
                    this.setState({
                        list: response.data
                    });

                })
        } else {
            this.setState({
                list: null,
                itemRatingId:id,
            });

        }
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

    deleteMenuItem(itemid){
        axios.get(`http://localhost:7000/deletemenuitem/?itemid=${itemid}`)
        .then((response) =>{
            console.log(response);
            this.forceUpdate();
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

    submitItemRating(id){
        /*
            private Integer userId;
            private Date date;
            private Integer itemId;
            private int rating;
            private String comment;
        */
        const itemRating = {
            userId:localStorage.getItem('uid'),
            date: null,
            itemId:this.state.itemRatingId,
            rating:this.state.itemRatingValue,
            comment:this.state.itemRatingComment,
        }
        axios.post(`http://localhost:7000/rateitem/`,itemRating);
        this.setState({
            itemRatingComment: '',
            itemRatingValue: 0,
            itemRatingId:-10,
            modalIsOpen: false,
        })
    }

    renderRatingForm(){
        if (!localStorage.getItem('uid')){
            return(<h1 className="text-secondary">Please Login to rate</h1>);
        }
        return(
            <div>
                <h1 className="text-secondary">Rating</h1>
                <p>Rate the item:</p>
                <StarRatingComponent
                    name=''/* name of the radio input, it is required */
                    value={this.state.itemRatingValue} /* number of selected icon (`0` - none, `1` - first) */
                    onStarClick={this.itemStarClick.bind(this)}
                />
                <p>Comments:</p>
                <textarea onChange={this.onItemCommentChange} className="form-control w-100, h-100"></textarea>
                <button onClick={()=>this.submitItemRating(this.itemRatingId)} className="btn btn-outline-success my-2 w-100">Submit</button>
            </div>
        );
    }

    onItemCommentChange = event =>{
        this.setState({
            itemRatingComment:event.target.value,
        })
    }

    itemStarClick(nextValue, prevValue, name) {
      this.setState({
          itemRatingValue:nextValue,
      });
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
                    <div>{this.state.list == null ? this.renderRatingForm():<JSONToTable  json={this.state.list} title="rating" />} </div>

                </Modal>
                <div className="container">
                    <div className="p-5 card mt-4">
                        <h1>Mains</h1>
                        <div className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>View Ratings</th>
                                    <th>Submit Your Own Rating</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.mainMenu.map((row, index)=>
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td>{row.price}</td>
                                        <td>{row.description}</td>
                                        <td><button onClick={() => this.openModal(row.itemId, false)} className="btn btn-outline-primary">View</button></td>
                                        <td><button onClick={() => this.openModal(row.itemId, true)} className="btn btn-outline-success">Rate It!</button></td>
                                        <td><button onClick={() => this.deleteMenuItem(row.itemId)} className="btn btn-outline-danger">Delete</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </div>
                    </div>

                    <div className="p-5 card">
                        <h1>Starters</h1>
                        <div className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>View Ratings</th>
                                    <th>Submit Your Own Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {starterData.map((row, index)=>
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td>{row.price}</td>
                                        <td>{row.description}</td>
                                        <td><button onClick={() => this.openModal(row.itemId, false)} className="btn btn-outline-primary">View</button></td>
                                        <td><button onClick={() => this.openModal(row.itemId, true)} className="btn btn-outline-success">Rate It!</button></td>
                                        <td><button onClick={() => this.deleteMenuItem(row.itemId)} className="btn btn-outline-danger">Delete</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </div>
                    </div>

                    <div className="p-5 card">
                        <h1>Beverages</h1>
                        <div className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>View Ratings</th>
                                    <th>Submit Your Own Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beverageData.map((row, index)=>
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td>{row.price}</td>
                                        <td>{row.description}</td>
                                        <td><button onClick={() => this.openModal(row.itemId, false)} className="btn btn-outline-primary">View</button></td>
                                        <td><button onClick={() => this.openModal(row.itemId, true)} className="btn btn-outline-success">Rate It!</button></td>
                                        <td><button onClick={() => this.deleteMenuItem(row.itemId)} className="btn btn-outline-danger">Delete</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </div>
                    </div>

                    <div className="p-5 card">
                        <h1>Desserts</h1>
                        <div className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>View Ratings</th>
                                    <th>Submit Your Own Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dessertData.map((row, index)=>
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td>{row.price}</td>
                                        <td>{row.description}</td>
                                        <td><button onClick={() => this.openModal(row.itemId, false)} className="btn btn-outline-primary">View</button></td>
                                        <td><button onClick={() => this.openModal(row.itemId, true)} className="btn btn-outline-success">Rate It!</button></td>
                                        <td><button onClick={() => this.deleteMenuItem(row.itemId)} className="btn btn-outline-danger">Delete</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>
            );
        }




    }

}
export default Menu;
