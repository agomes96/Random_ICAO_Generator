import React, {useState} from "react"

//Database
import airports from "../jsonDatabase/airports.json"

//Components
import CardComponent from "./CardComponent"

//Bootstrapp
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'



function IcaoGenerator(){
   
    //State hooks
    const [icao, setIcao] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const [elevation, setElevation] = useState()

    function formSubmitHandle(event){
        event.preventDefault()
        
        generateIcao()
        
    }

    function generateIcao(){
        const result = Object.values(airports[Object.keys(airports)[Math.floor(Math.random() * Object.keys(airports).length)]])

        setIcao(result[0])
        setName(result[2])
        setCity(result[3])
        setState(result[4])
        setCountry(result[5])
        setLat(result[7])
        setLon(result[8])
        setElevation(result[6])
        
    }

    return(
        <div>
            <Row>
                <Col></Col>
                <Col xs={5}>
                <CardComponent 
                    icao={icao} 
                    name={name} 
                    city={city} 
                    state={state} 
                    country={country} 
                    lat={lat} 
                    lon={lon} 
                    elevation={elevation}
                    formSubmit={formSubmitHandle}
                />
                </Col>
                <Col></Col>
            </Row>
            
        </div>    
    )
}

export default IcaoGenerator