import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function arePropertiesEmpty(obj) {
    for (var key in obj) {
    if (obj[key] !== null && obj[key] != "")
        return false;
    }
    return true;
}

const ResponseContainer = props => {
    console.log("These are the response props:");
    console.log(props);
    if (props.response != null) {
        console.log(props);
        
        if (!arePropertiesEmpty(props.response)) {
        
            let returnValue = Object.keys(props.response).map( (key, i) => {
                return (
                <Form.Group controlId={"formGroupResponse" + key}>
                    <Form.Label>{key}</Form.Label>
                    <Form.Control type="text" value={props.response[key]} readOnly="true" />
                </Form.Group>
                )
             });
            return (
                <div>
                    <Row>
                        <h2>Decision Server Reponse</h2>
                    </Row>
                    <Row>
                        <Col>
                        {returnValue}
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return null;
        }
    } else {
        return null;
    } 
}

export default ResponseContainer;
