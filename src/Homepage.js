import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import JSONToTable from './JSONToTable';

class Homepage extends Component {

    constructor(){
        super();
        this.state={
            hfam:[],
            hfom:[],
            carouselData:[],
        }
        this.getStuff();
    }
    getStuff(){
        var hfamGet=[];
        var hfomGet=[];
        var carouselDataGet=[];
        axios.get(`http://localhost:7000/hfam/`)
        .then((response)=>{
            console.log(response);
            hfamGet=response.data;
            this.setState({
                hfam:hfamGet,
            })
        })
        axios.get(`http://localhost:7000/hfom/`)
        .then((response)=>{
            console.log(response);
            hfomGet=response.data;
            this.setState({
                hfom:hfomGet,
            })
        })
        axios.get(`http://localhost:7000/averagetypecat/`)
        .then((response)=>{
            console.log(response);
            carouselDataGet=response.data;
            this.setState({
                carouselData:carouselDataGet,
            })
        })
    }

    render(){
        const sliderSettings={
          dots: true,
          infinite: true,
          adaptiveHeight: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        }
        if (!this.state.hfom){
            return (<p>no headers</p>);
        }
        return(
            <div className="container">
                <div className="jumbotron">
                    <Slider {...sliderSettings}>
                        <div>Hello</div>
                        <div>Hello</div>
                        <div>Hello</div>
                    </Slider>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <p>test test test test </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <h5 className="text-secondary">Highest Raters</h5>
                            <p>(Based off of Food OR Mood)</p>
                            {JSONToTable(this.state.hfom)}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <h5 className="text-secondary">Highest Raters</h5>
                            <p>(Based off of Food AND Mood)</p>
                            {JSONToTable(this.state.hfam)}
                        </div>
                    </div>
                </div>

            </div>

        );
    }

}
export default Homepage
