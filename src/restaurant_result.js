import React from 'react';

const RestaurantResult = (props) =>{
    var restau = props.rest;
    if(restau == null){
        return <p>LOADING</p>;
    }
    
    return(
        
        <div className="RestaurantList">
        <div className="container-fluid">
            <div className="row">
                
                {restau.map((restaurant, index) =>
                    <div key={index} className="card m-4 col-md-2 col-sm-6 p-0">
                        <img className="card-img-top" src="https://whalebonemag.com/wp-content/uploads/2015/08/DSC_4647-Edit-1050x701.jpg" alt="Card image cap"></img>
                        <div className="card-body">
                          <h5 className="card-title">{restaurant.name}</h5>
                          <p className="card-text">this is just some example text haha this is great keep writing example text</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>
    );


}

export default RestaurantResult;