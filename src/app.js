import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './search_bar';
import RestaurantResult from './restaurant_result';
import registerServiceWorker from './registerServiceWorker';
import Modal from 'react-modal';
import JSONToTable from './JSONToTable';
import Homepage from './Homepage';
// import './css/modal.css';

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

class App extends Component{
    constructor(props){
        super(props);
        // this.databaseQuery('');
        this.state={
            searchTerm: null,
            list: [],
            current: '', //it will either be 'search' or 'modal'
            modalIsOpen: false,
            type: '',
            input: '',
            modalData: [],
        };

        this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
      }



      closeModal() {
        this.setState({modalIsOpen: false});
      }

    render(){


        return (
            <div>
                <SearchBar micsQuery={(type,input) => this.databaseMiscQuery(type,input)} open={() => this.openModal()} current={() => this.toggleSearch() } onSearchTermChange={searchTerm => this.databaseQuery(searchTerm)}/>
                {this.state.current=='search' ? <RestaurantResult rest={this.state.list} /> : <Homepage />}
            <div>
        <Modal
          isOpen={this.state.modalIsOpen}

          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >


          {/* <button onClick={this.closeModal}>close</button> */}
          <div>{this.state.modalData == null ? <p>HOL UP</p> :JSONToTable(this.state.modalData)} </div>

        </Modal>
      </div>
            </div>

        );
    }

    databaseQuery(term){
        this.setState({
            current: 'search'
        });

        var search;
        if(term == ''){
            search = 'http://localhost:7000/restau/';
            console.log('reacyed');
        } else {
            search = `http://localhost:7000/restau/?name=${term}`;
        }
        console.log(search.length);
        axios.get(search)
            .then((response) => {
                this.setState({
                    list: response.data
                });

            })
            .catch( (error) => {
            console.log(error);
             });

    }

    toggleSearch(){
        this.setState({
            current: null
        });
    }

    databaseMiscQuery(type,input){
        this.setState({type: type});
        this.setState({input:input});
        var search='';
        if(type=='managerByCategory'){
            search = `http://localhost:7000/managercategory/?type=${input}`;
        }
        else if(type=='raters'){
            search = `http://localhost:7000/totalratingrest/`;
        }
        else if(type=='2015'){
            search = `http://localhost:7000/januaryrest/`;
        }
        else if(type=='lower'){
            search=`http://localhost:7000/staffrating/?name=${input}`;
        }

        else if(type=='highest'){
            search=`http://localhost:7000/typehighestfood/?type=${input}`
        }

        axios.get(search)
        .then((response) => {
            console.log("heyho");
            console.log(response.data);
            this.setState({
                modalData: response.data
            });

        })

        // else if(type=='raters'){
        //     axios.get(`http://localhost:7000/totalratingrest/`)
        //     .then((response) => {
        //         this.setState({
        //             modalData: response.data
        //         });

        //     })
        // }

    }
}

export default App;
