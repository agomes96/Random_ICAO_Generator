import React from "react"

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import countries from "../jsonDatabase/countries.json"

function FormComponent(props){

    return(
      
        <Form className="card-body">
            <Form.Group as={Row} controlId="formTextName">
                <Form.Label column sm={2}>
                    City or State
                </Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        type="text" 
                        value={props.nameSearch} 
                        name="nameSearch" 
                        placeholder="Enter a City or a State" 
                        onChange={props.handleChangeForm}
                    />
                </Col>
            </Form.Group>

            <fieldset>
                <Form.Group as={Row} controlId="formSelectCountry">
                    <Form.Label column sm={2}>
                        Country
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            as="select" 
                            value={props.countrySearch}
                            onChange={props.handleChangeForm}
                            name="countrySearchInput"
                        >
                            <option value="">All</option>
                            {countries.map((option, index) => {
                                    return (<option key={index} value={option.abbreviation}>{option.country}</option>)
                                })
                            }    
                        </Form.Control>
                    </Col>

                </Form.Group>
            </fieldset>

            <fieldset>
                <Form.Group as={Row} controlId="formSelectContinent">
                    <Form.Label column sm={2}>
                        Continent
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="select" 
                            value={props.continentSearch}
                            onChange={props.handleChangeForm}
                            name="continentSearchInput"
                            disabled={props.isContinentSelectEnable}
                        >
                            <option value="">All</option>
                            <option value="Africa">Africa</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="North America">North America</option>
                            <option value="Oceania">Oceania</option>
                            <option value="South America">South America</option>
                        </Form.Control>
                    </Col>

                </Form.Group>
            </fieldset>
        </Form>
    )
}

export default FormComponent