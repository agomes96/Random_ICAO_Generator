import React from "react"

function CardComponent(props){

    return(
        
        <div className="card">
 
            {props.icao !== "" &&
                <div>

                    <iframe 
                        src={"https://maps.google.com/maps?q="+props.lat+","+props.lon+"&t=k&z=13&output=embed"} 
                        className="card-img-top" 
                        frameBorder="0" 
                        style={{border:0}} 
                        title="mapFrame" 
                        allowFullScreen>
                    </iframe>
        
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <ul className="list-group">

                            <li className="list-group-item list-group-item-success">
                                <i className="fa fa-briefcase"style={{fontSize:20+"px"}}>ICAO: {props.icao}</i>    
                            </li>

                            <li className="list-group-item list-group-item-success">
                                <i className="fa fa-user"style={{fontSize:20+"px"}}>Airport Name: {props.name}</i>
                            </li>

                            <li className="list-group-item list-group-item-success">
                                <i className="fa fa-map-marker"style={{fontSize:20+"px"}}>City: {props.city}</i>
                            </li>

                            <li className="list-group-item list-group-item-success">
                                <i className="fa fa-clock-o"style={{fontSize:20+"px"}}>State: {props.state}</i>   
                            </li>

                            <li className="list-group-item list-group-item-success">
                                <i className="fa fa-clock-o"style={{fontSize:20+"px"}}>Country: {props.country}</i>
                            </li>

                            <li className="list-group-item list-group-item-success">
                                <i className="fa fa-inr"style={{fontSize:20+"px"}}>Lat/Long: {props.lat +", "+props.lon}</i>
                            </li>

                            <li className="list-group-item list-group-item-success">
                                <i className="fa fa-inr"style={{fontSize:20+"px"}}>Elevation: {props.elevation}</i>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default CardComponent