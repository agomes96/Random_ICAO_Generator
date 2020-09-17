import React, {useState, useEffect} from "react"

//Database
import airports from "../jsonDatabase/airports.json"
import countries from "../jsonDatabase/countries.json"
import continents from "../jsonDatabase/continents.json"

//Components
import CardComponent from "./CardComponent"
import FormComponent from "./FormComponent"

//Bootstrapp
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'




function IcaoGenerator(){
   
    //Airport State hooks
    const [icao, setIcao] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const [elevation, setElevation] = useState()
    
    //Form State hooks
    const [nameSearch, setNameSearch] = useState("")
    const [countrySearch, setCountrySearch] = useState("")
    const [continentSearch, setContinentSearch] = useState("")
    const [isContinentSelectEnable, setisContinentSelectEnable] = useState(false)

    //Alert State hook
    const [notFoundAlert, setnotFoundAlert] = useState(false);

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
    
    /**
     * Function with the logic of the form to generate a airport
     */
    function generateIcao(){
        
        var resultICAO ="",
            resultListSearch=""

        //All search filters empty
        if(continentSearch === "" && countrySearch === "" && nameSearch === ""){
            resultICAO = generateIcaoFromAll()
            setResult(resultICAO)
            return(null)
        }

        //Continent 1 - name 0
        if(continentSearch !== "" && nameSearch === ""){
            resultListSearch = searchByContinent(continentSearch)
            if(!checkListNotEmpty(resultListSearch)){
                resultICAO = generateIcaoWithList(resultListSearch)
                setResultWithObject(resultICAO)
            }
            return(null)
        }

        //Country 1 - name 0
        if (countrySearch !== "" &&  nameSearch === ""){
            resultListSearch = searchByCountry(countrySearch)
            if(!checkListNotEmpty(resultListSearch)){
                resultICAO = generateIcaoWithList(resultListSearch)
                setResultWithObject(resultICAO)
            }
           
            return(null)  
        }

        //continent 0 - country 0 - name 1
        if(nameSearch !== "" && countrySearch === "" && continentSearch === "" ){
            resultListSearch = Object.values(airports).filter(function(airportData) {
                return (airportData.city.toLowerCase().includes(nameSearch.toLowerCase()) || airportData.state.toLowerCase().includes(nameSearch.toLowerCase()))
            })
            if(!checkListNotEmpty(resultListSearch)){
                resultICAO = generateIcaoWithList(resultListSearch)
                setResultWithObject(resultICAO)
            }
            return(null)
        }
        
        //continent 1 - name 1
        if(nameSearch !== "" && continentSearch !== ""){
            resultListSearch = searchByContinent(continentSearch)
            resultListSearch = searchByName(resultListSearch, nameSearch)
            if(!checkListNotEmpty(resultListSearch)){
                resultICAO = generateIcaoWithList(resultListSearch)
                setResultWithObject(resultICAO)
            }
            return (null)
        }

         //country 1 - name 1
         if(nameSearch !== "" && countrySearch !== ""){
            resultListSearch = searchByCountry(countrySearch)
            resultListSearch = searchByName(resultListSearch, nameSearch)
            if(!checkListNotEmpty(resultListSearch)){
                resultICAO = generateIcaoWithList(resultListSearch)
                setResultWithObject(resultICAO)
            }
            return (null)
        }
    }

    /**
     * Function to pick a random airport from a filtered list
     * @param {array} listSearch list with the filtered airports
     */
    function generateIcaoWithList(listSearch){
        return(listSearch[Object.keys(listSearch)[Math.floor(Math.random() * Object.keys(listSearch).length)]])
    }

    /**
     * Check if the possible airports list is not empty, if empty show the red banner
     * @param {array} resultList list with the filtered airports
     */
    function checkListNotEmpty(resultList){
        
        if(resultList[0] === undefined){
            setnotFoundAlert(true)
            setIcao("")
            return true
        }
        setnotFoundAlert(false)
        return false
    }

    /**
     * Funtion to return all the airports that have the name in the city or state
     * @param {Array of Airport Data} airportsData airport list data
     * @param {string} name name to search in city and state on the airport array list
     */
    function searchByName(airportsData, name){
        return( airportsData.filter(function(airportData){
            return (airportData.city.toLowerCase().includes(name.toLowerCase()) || airportData.state.toLowerCase().includes(name.toLowerCase()))
        }))
    } 
    

    /**
     * Function to return all the airports in a given country
     * @param {string} countryCode code of the country we want to search
     */
    function searchByCountry(countryCode){
        return (Object.values(airports).filter(airportData =>
            airportData.country === countryCode))
    }

    /**
     * Function to return all the airports in a given continent
     * @param {string} continent  Continent to filter the search
     */
    function searchByContinent(continent){

        const resultContinent = continents.filter(continentData => continentData.continent===continent).map(function({country}){
            return {country};
        })

        const resultCountries = countries.filter(function(countries_el){
            return resultContinent.filter(function(resultContinent_el){
               return resultContinent_el.country === countries_el.country;
            }).length === 1
         })



        return (Object.values(airports).filter(function(airportData) {
            return resultCountries.filter(function(resultCountries_el){
                return resultCountries_el.abbreviation === airportData.country;
             }).length === 1  
        }))
    }

    /**
     * Function to generate a random Airport from all the airports 
     */
    function generateIcaoFromAll(){
        return Object.values(airports[Object.keys(airports)[Math.floor(Math.random() * Object.keys(airports).length)]])
    }

    /**
     * Function to set the airport result from the result of all aiport generate function
     * @param {array} result Variable with the information of airport
     */
    function setResult(result){

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
     * Function to set the airport result from the result of filtered list of aiports 
     * @param {array} result Variable with the information of airport
     */
    function setResultWithObject(result){

        setIcao(result.icao)
        setName(result.name)
        setCity(result.city)
        setState(result.state)
        setCountry(getCountryName(result.country))
        setLat(result.lat)
        setLon(result.lon)
        setElevation(result.elevation)
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
        if(countrySearch !== ""){
            setisContinentSelectEnable(true)
            setContinentSearch("")
        }else{
            setisContinentSelectEnable(false)
        }

        
    }, [countrySearch])
    

    /**
     * Function with the Alert component
     */
    function AlertDismissible() {  
        return (
            <Alert variant="danger" onClose={() => setnotFoundAlert(false)} dismissible>
              <Alert.Heading>No ICAO Found!</Alert.Heading>
              <p>
                Try To Change The Filters Search
              </p>
            </Alert>
          );
      }

    return(
        <div>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    {notFoundAlert === true && <AlertDismissible />}
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