import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';





class RestaurantDetail extends Component{
    constructor(props){
        super(props);

        
        
        
    }
    renderStars(num){

        
    }
    
    

    render(){
        const height= {
            height:"5%",
         };

         const padding={
             padding:"5%",
         }
        
        return(
           <div class="card-group" style={padding}>
                <div class="card">
                    
                    <div class="card-body">
                    <img src="https://logopond.com/logos/7b5b4ac4081ca3a69d3944470535efd7.png" alt="Card image cap" style={height}/>
                    <h5 class="card-title">Card title</h5>
                    
                    </div>
                </div>
                <div class="card">
                    
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="card">
                   
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        );
    }



}
export default RestaurantDetail;
