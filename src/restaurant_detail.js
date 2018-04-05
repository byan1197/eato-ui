import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';





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
             backgroundColor: "rgba(255,255,255,0)",
             border: "none",
              
         }
        
         if(this.props.restaurant == null){
             return(<p>Loading</p>);
         }
         console.log(this.props.restaurant.logoUrl);
        return(
            <div className="card" style={padding}>
                <div className="row">
                    <div className="col-md-2">
                        <img className="asdf" src={this.props.restaurant.logoUrl} style={height}/>
                    </div>
                    <div className="col-md-5 mx-5">
                        <h1>{this.props.restaurant.name}</h1>
                    </div>
                    <div className="col-md-5">
                        test
                    </div>
                </div>
            </div>
           /* <div className="card-group" style={padding}>
                <div className="card" style={cardStyles}>
                    
                    <div className="card-body ">
                       
                    <img src={this.props.restaurant.logoUrl} alt="Card image cap" style={height}/>
                    
                    
                    </div>
                </div>
                <div className="card">
                    
                    <div className="card-body" style={this.cardStyles}>
                    <h5 className="card-title">{this.props.restaurant.name}</h5>
                    <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div className="card">
                   
                    <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div> */
        );
    }



}
export default RestaurantDetail;
