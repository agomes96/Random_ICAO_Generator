import React, {useState, useEffect} from "react"

//Database
import airports from "../jsonDatabase/airports.json"
import countries from "../jsonDatabase/countries.json"

//Components
import CardComponent from "./CardComponent"
import FormComponent from "./FormComponent"

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

    const [nameSearch, setNameSearch] = useState("")
    const [countrySearch, setCountrySearch] = useState("")
    const [continentSearch, setContinentSearch] = useState("")

    const [isContinentSelectEnable, setisContinentSelectEnable] = useState(false)

    /**
     * Function to handle the generate button
     * @param {*} event 
     */
    function formSubmitHandle(event){
        event.preventDefault()
        generateIcao()
    }

    /**
     * Function to search the name of the country by the two digit code
     * @param {string} countryCode Country code to search in DB
     */
    function getCountryName(countryCode){
        const result = countries.find(countryData => countryData.abbreviation === countryCode).country
        if(result !== undefined) 
            return result
        return countryCode
    }
    
    function generateIcao(){
        const result = Object.values(airports[Object.keys(airports)[Math.floor(Math.random() * Object.keys(airports).length)]])

        setIcao(result[0])
        setName(result[2])
        setCity(result[3])
        setState(result[4])
        setCountry(getCountryName(result[5]))
        setLat(result[7])
        setLon(result[8])
        setElevation(result[6])
        
    }

    /**
     * Function to handle the form submit
     * @param {object} event 
     */
    function handleChangeForm(event) {
        const {name, value} = event.target
        if(name === "continentSearchInput"){
            setContinentSearch(value)
        }else if(name === "countrySearchInput"){
            setCountrySearch(value)
        }else(setNameSearch(value))
        
    }


    /**
     * Disable the continent form option when the country is selected
     */
    useEffect(() => {
        countrySearch !== "" ? setisContinentSelectEnable(true) : setisContinentSelectEnable(false)
    }, [countrySearch])
    

    return(
        <div>
            <Row>
                <Col></Col>
                <Col xs={6}>

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

                    <FormComponent 
                        nameSearch={nameSearch}
                        countrySearch={countrySearch}
                        continentSearch={continentSearch}
                        handleChangeForm={handleChangeForm}
                        isContinentSelectEnable={isContinentSelectEnable}
                        setisContinentSelectEnable={setisContinentSelectEnable}
                    />

                    <div className="card-footer text-center ">
                        <button 
                            type="button" 
                            className="btn " 
                            id="left-panel-link" 
                            onClick={formSubmitHandle}>
                            Generate
                        </button>
                    </div>

                </Col>
                <Col></Col>
            </Row>
            
        </div>    
    )
}

export default IcaoGenerator