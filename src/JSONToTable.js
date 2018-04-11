import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const JSONToTable = (props) => {
    var tableHeaders=[]
    var tableData=[]

    var names = {};
    names.raters='Number of ratings of restaurants by raters (f)'
    names.managerByCategory='Managers Names For Each Category of Restaurant (c)';
    names.Jan='Not Rated in 2015 January (g)';
    names.lower='Names and Dates of Restaurants with Ratings Lower Than.. (h)';
    names.highest='Type with Highest Food (i)';
    names.rating='Ratings';



    if(props.json.length == 0){
        return(<h1 className="text-secondary">No results found.</h1>)
    }
    
    for (var s in props.json[0]){
        tableHeaders.push(s);
    }

    return(
        <div className="table table-hover">
            <h1>{names[props.title]}</h1>
            <thead>
                <tr>
                    {tableHeaders.map((header,index)=>
                        <th key={index}>{header}</th>
                    )}
                </tr>
            </thead>
            {props.json.map((row, index)=>
                <tr>{
                tableHeaders.map((key, index)=>
                    <td>{row[key]}</td>
                )}
                </tr>
                )}
        </div>
    );
}
export default JSONToTable;
