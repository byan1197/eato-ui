import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import Stars from './stars';





class RestaurantDetail extends Component{
    constructor(props){
        super(props);

        this.state={
            restaurant: null,
        }
        
        
    }
    
    render(){
        
        
        const height= {
            height:"200px",
            width:"200px",
         };

         const cardStyles= {
            flexGrow: -5
         }

         const padding={
             margin:"5% 20% 5% 20%",
            //   backgroundColor: "rgba(255,255,255,0)",
            //  border: "none",
              
         }

         const table={
             width:"20%",
         }
        
         if(this.props.restaurant == null){
             return(<p>Loading</p>);
         }
         console.log(this.props.restaurant.logoUrl);
        return(
            <div className="card" style={padding}>
                <div className="row">
                    <div className="col-md-3">
                        <img className="asdf" src={this.props.restaurant.logoUrl} style={height}/>
                    </div>
                    <div className="col-md-3 ">
                        <h1>{this.props.restaurant.name}</h1>
                        <h5>food rating: {Stars(this.props.restaurant.foodRating)}</h5>
                        <h5>price rating: {Stars(this.props.restaurant.priceRating)}</h5>
                        <h5>mood rating: {Stars(this.props.restaurant.moodRating)}</h5>
                        <h5>staff rating: {Stars(this.props.restaurant.staffRating)}</h5>
                    </div>
                    <div className="col-md-6">
                        <h1>Locations</h1>
                        <table className="table" style={table}>
                            <thead>
                                <tr>
                                <th scope="col">Address</th>
                                <th scope="col">Manager Name</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">First Open Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.locations.map((location,index) =>
                                
                                <tr>
                    
                                <th scope="row">{location.streetAddress}</th>
                                <td>{location.managerName}</td>
                                <td>{location.phoneNumber}</td>
                                <td>{location.firstOpenDate}</td>
                                
                                

                               
                                </tr>
                               
                            )}
                            </tbody>
                            </table>
                    </div>
                </div>
            </div>
           
        );
    }



}
export default RestaurantDetail;
