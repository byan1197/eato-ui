import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import JSONToTable from './JSONToTable';
import './css/home.css'

class Homepage extends Component {

    constructor(){
        super();
        this.state={
            hfam:[],
            hfom:[],
            carouselData:[],
            mainCarouselData: null,
            starterCarouselData: null,
            dessertCarouselData: null,
            beverageCarouselData: null,
            polarizingRank:[],
        }
    }
    componentDidMount(){
        var hfamGet=[];
        var hfomGet=[];
        var carouselDataGet=[];
        axios.get(`http://localhost:7000/hfam/`)
        .then((response)=>{
            hfamGet=response.data;
            this.setState({
                hfam:hfamGet,
            })

        })
        axios.get(`http://localhost:7000/hfom/`)
        .then((response)=>{
            hfomGet=response.data;
            this.setState({
                hfom:hfomGet,
            })
        })
        axios.get(`http://localhost:7000/polarizing/`)
        .then((response)=>{
            this.setState({
                polarizingRank: response.data,
            });
        })
        axios.get(`http://localhost:7000/averagetypecat/`)
        .then((response)=>{
            carouselDataGet=response.data;
            this.setState({
                carouselData:carouselDataGet,
            });
            this.formatCarouselData();
        })

    }

    formatCarouselData(){
        const cats = ['BEVERAGE', 'MAIN','STARTER','DESSERT'];
        const carsouselContent = this.state.carouselData;
        var mainData = [];
        var starterData = [];
        var beverageData = [];
        var dessertData = [];

        this.setState({
            mainCarouselData: null,
            starterCarouselData: null,
            dessertCarouselData: null,
            beverageCarouselData: null,
        })

        for (var i =0; i < carsouselContent.length; i++){
            // if(carouselData[i]['category']===cats[s]){
            if(carsouselContent[i]['category']==="MAIN"){
                console.log("inserted into main")
                mainData.push({
                    avg:carsouselContent[i]['avg'],
                    type:carsouselContent[i]['type'],
                })
            }
            else if(carsouselContent[i]['category']==="BEVERAGE"){
                beverageData.push({
                    avg:carsouselContent[i]['avg'],
                    type:carsouselContent[i]['type'],
                })

            }
            else if(carsouselContent[i]['category']==="STARTER"){
                starterData.push({
                    avg:carsouselContent[i]['avg'],
                    type:carsouselContent[i]['type'],
                })
            }
            else if(carsouselContent[i]['category']==="DESSERT"){
                dessertData.push({
                    avg:carsouselContent[i]['avg'],
                    type:carsouselContent[i]['type'],
                })

            }
        }
        this.setState({
            mainCarouselData: mainData,
            starterCarouselData: starterData,
            dessertCarouselData: dessertData,
            beverageCarouselData: beverageData,
        });
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

        console.log("main is:");
        console.log(main);

        const main = this.state.mainCarouselData;
        const starter = this.state.starterCarouselData;
        const dessert = this.state.dessertCarouselData;
        const beverage = this.state.beverageCarouselData;

        console.log(main);

        if (main == null || starter == null || dessert == null || beverage == null) {
            return (<p>not ready yet</p>);
        }
        if (!this.state.hfom){
            return (<p>no headers</p>);
        }

        const inline ={
            display:"flex",
            flexWrap: "wrap"
        }
        const cardnobg={
            backgroundColor: "rgba(0,0,0,0.5)",
            minHeight:"100%",
        }
        const noColorBG={
            backgroundColor: "rgba(0,0,0,0)",
        }

        return(
            <div>
                <div className="container">

                    <div className="jumbotron" style={noColorBG}>
                        <Slider {...sliderSettings}>
                            <div className="mainbg">
                                <div className="card h-100 text-white" style={cardnobg}>
                                    <div className="card-header">
                                        <h1>Average prices of mains</h1>
                                    </div>
                                    <div className="container">
                                        <div style={inline}>
                                            {main.map((data, index)=>
                                                <div className="col-md-2" >
                                                    <p><b>{data.type}</b></p>
                                                    <p>${data.avg}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="starterbg">
                                <div className="card h-100 text-white" style={cardnobg}>
                                    <div className="card-header">
                                        <h1>Average prices of starters</h1>
                                    </div>
                                    <div className="container">
                                        <div style={inline}>
                                            {starter.map((data, index)=>
                                                <div className="col-md-2" >
                                                    <p><b>{data.type}</b></p>
                                                    <p>${data.avg}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="beveragebg">
                                <div className="card h-100 text-white" style={cardnobg}>
                                    <div className="card-header">
                                        <h1>Average prices of beverages</h1>
                                    </div>
                                    <div className="container">
                                        <div style={inline}>
                                            {beverage.map((data, index)=>
                                                <div className="col-md-2" >
                                                    <p><b>{data.type}</b></p>
                                                    <p>${data.avg}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dessertbg">
                                <div className="card h-100 text-white" style={cardnobg}>
                                    <div className="card-header">
                                        <h1>Average prices of desserts</h1>
                                    </div>
                                    <div className="container">
                                        <div style={inline}>
                                            {dessert.map((data, index)=>
                                                <div className="col-md-2" >
                                                    <p><b>{data.type}</b></p>
                                                    <p>${data.avg}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>






                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <div className="card px-2 ">
                                <h4 className="text-secondary">Highest Raters</h4>
                                <p>(Based off of Food AND Mood)</p>
                                <JSONToTable json={this.state.hfam}/>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <div className="px-2 card">
                                <h4 className="text-secondary">Highest Raters</h4>
                                <p>(Based off of Food OR Mood)</p>
                                <JSONToTable json={this.state.hfom} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12">
                            <div className="px-2 card">
                                <h4 className="text-secondary">Highest Food Ratings</h4>
                                <p>Based on type of restaurant</p>
                                <JSONToTable json={this.state.polarizingRank} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
export default Homepage
