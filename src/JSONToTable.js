import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const JSONToTable = (jsonData) => {
    var tableHeaders=[]
    var tableData=[]
    for (var s in jsonData[0]){
        tableHeaders.push(s);
    }

    if(jsonData.length == 0){
        return(<h1 className="text-secondary">No results found.</h1>)
    }

    return(
        <div className="table table-hover">
            <thead>
                <tr>
                    {tableHeaders.map((header,index)=>
                        <th key={index}>{header}</th>
                    )}
                </tr>
            </thead>
            {jsonData.map((row, index)=>
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
