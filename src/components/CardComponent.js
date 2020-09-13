import React from "react"

function CardComponent(props){

    return(
        
        <div className="card">
 
            {props.icao !== "" &&<div>
            <iframe src={"https://maps.google.com/maps?q="+props.lat+","+props.lon+"&t=k&z=13&output=embed"} className="card-img-top" frameBorder="0" style={{border:0}} title="mapFrame" allowFullScreen></iframe>
   
             <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-success"><i className="fa fa-briefcase"style={{fontSize:20+"px"}}></i>   ICAO: {props.icao}</li>
                    <li className="list-group-item list-group-item-success"><i className="fa fa-user"style={{fontSize:20+"px"}}></i>   Airport Name: {props.name}</li>
                    <li className="list-group-item list-group-item-success"><i className="fa fa-map-marker"style={{fontSize:20+"px"}}></i>   City: {props.city}</li>
                    <li className="list-group-item list-group-item-success"><i className="fa fa-clock-o"style={{fontSize:20+"px"}}></i>   State: {props.state}</li>
                    <li className="list-group-item list-group-item-success"><i className="fa fa-clock-o"style={{fontSize:20+"px"}}></i>   Country: {props.country}</li>
                    <li className="list-group-item list-group-item-success"><i className="fa fa-inr"style={{fontSize:20+"px"}}></i>   Latitude: {props.lat}</li>
                    <li className="list-group-item list-group-item-success"><i className="fa fa-inr"style={{fontSize:20+"px"}}></i>   Longitude: {props.lon}</li>
                    <li className="list-group-item list-group-item-success"><i className="fa fa-inr"style={{fontSize:20+"px"}}></i>   Elevation: {props.elevation}</li>
                </ul>
            
            </div></div>
            }
            <div className="card-footer text-center">
                <button type="button" className="btn " id="left-panel-link" onClick={props.formSubmit}>Generate</button>
            </div>
        </div>
    )
}

export default CardComponent