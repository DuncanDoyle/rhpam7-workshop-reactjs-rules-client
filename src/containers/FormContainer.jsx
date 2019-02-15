import React, {Component} from 'react';  

/* Import Components */
import CheckBox from '../components/CheckBox';  
import Input from '../components/Input';  
import TextArea from '../components/TextArea';  
import Select from '../components/Select';
import FormButton from '../components/FormButton'
import ResponseContainer from './ResponseContainer'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { throws } from 'assert';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { timingSafeEqual } from 'crypto';

class FormContainer extends Component {  
    constructor(props) {
      super(props);
  
      this.state = {
        ccHolder: {
          name: '',
          age: '',
          status: ''
        },
        fraudData: {
           description: '',
           amount: ''
        },
        response: {
            riskRating: '',
            automatedProcessing: ''
        },
        statusOptions: ['Silver', 'Gold', 'Platinum'],
      }
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
      this.handleCCHolderInput = this.handleCCHolderInput.bind(this);
      this.handleFraudDataInput = this.handleFraudDataInput.bind(this);
      this.setResponseState = this.setResponseState.bind(this);
    }


    handleCCHolderInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
           return { 
              ccHolder : {
                       ...prevState.ccHolder, [name]: value
                      }
           }
        }, () => {
            console.log(this.state.ccHolder);
            console.log(this.state.fraudData);
            console.log(this.state.response);
        }
        )
    }

    handleFraudDataInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
           return { 
              fraudData : {
                       ...prevState.fraudData, [name]: value
                      }
           }
        }, () => {
            
            console.log(this.state.ccHolder);
            console.log(this.state.fraudData);
            console.log(this.state.response);
        }
        )
    }

    setResponseState(data) {
        //let disputeRiskRating = data.result.execution-results.results[0].value.com.myspace.ccd_project.FraudData.disputeRiskRating`;
        let fraudData = data.result["execution-results"].results[0].value["com.myspace.ccd_project.FraudData"];
        let disputeRiskRating = fraudData.disputeRiskRating;
        let automated = fraudData.automated;
        console.log("Dispute Risk Rating: " + JSON.stringify(disputeRiskRating));
        console.log("Automated: " + JSON.stringify(automated));
        this.setState( prevState => {
           return { 
              response : {
                       ...prevState.reponse, riskRating: disputeRiskRating, automated: automated
                      }
           }
        }, () => {
            console.log(this.state.ccHolder);
            console.log(this.state.fraudData);
            console.log(this.state.response);
        }
        )
    }

    /*
    handleCheckBox(e) {
        const newSelection = e.target.value;
        let newSelectionArray;
    
        if(this.state.ccHolder.skills.indexOf(newSelection) > -1) {
          newSelectionArray = this.state.ccHolder.skills.filter(s => s !== newSelection)
        } else {
          newSelectionArray = [...this.state.ccHolder.skills, newSelection];
        }
    
        this.setState( prevState => ({ ccHolder:
            {...prevState.ccHolder, skills: newSelectionArray }
            })
        )
    }
    */
    /*
    handleTextArea(e) {
        console.log("Inside handleTextArea");
        let value = e.target.value;
        this.setState(prevState => ({
          ccHolder: {
            ...prevState.ccHolder, about: value
          }
          }), ()=>console.log(this.state.ccHolder))
    }
    */

     /* This life cycle hook gets executed when the component mounts */
    
    handleFormSubmit(e) {
        console.log("Sending data to the rules engine.");
        e.preventDefault();
        let ccHolderData = this.state.ccHolder;
        let fraudData = this.state.fraudData;
        let requestBody = {
            "lookup":null,
            "commands":[  
                {  
                    "insert":{  
                        "object":{  
                            "com.myspace.ccd_project.CreditCardHolder":{  
                                "age": ccHolderData.age,
                                "status":ccHolderData.status
                            }
                        },
                        "out-identifier":"ccholder",
                        "return-object":true,
                        "entry-point":"DEFAULT",
                        "disconnected":false
                    }
                },
                {  
                    "insert":{  
                        "object":{  
                            "com.myspace.ccd_project.FraudData":{  
                                "totalFraudAmount":fraudData.amount
                            }
                        },
                        "out-identifier":"frauddata",
                        "return-object":true,
                        "entry-point":"DEFAULT",
                        "disconnected":false
                    }
                },
                {  
                    "fire-all-rules":{  
                    "max":-1,
                    "out-identifier":null
                }
            }
        ]
        }
        //TODO: Fix loading of configuration files.
        let kieServerUrl = process.env.REACT_APP_KIE_SERVER_URL;
        console.log("KIE-Server URL: " + kieServerUrl);
        let testEnv = process.env.REACT_APP_NOT_SECRET_CODE;
        console.log("Test env: " + testEnv);
        kieServerUrl = "http://localhost:8080/kie-server"
        console.log("KIE-Server URL: " + kieServerUrl);
        fetch(kieServerUrl + '/services/rest/server/containers/instances/ccd-project_1.0.0',{
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ZG1BZG1pbjpyZWRoYXRkbTEh'
            },
        }).then(response => {
            response.json().then(data => {
            console.log("Successful" + JSON.stringify(data));
            this.setResponseState(data);
        })
    })
    }

    

    handleClearForm(e) {
        //e.preventDefault() prevents the page from being refreshed on form submission, which is the default form behavior.
        e.preventDefault();
        this.setState({ 
            ccHolder: {
                name: '',
                age: '',
                status: ''
            },
            fraudData: {
                description: '',
                amount: ''
            },
            response: {
                riskRating: '',
                automatedProcessing: '' 
            }
        })
    }

    render() {
        
        //TODO: only render response when we actually have a response. Would be nice to use a response container for that to which we push response state once fetched.
        //  let response; if (this.state.response.riskRating == 0) {  } else {  }*/

        return (
            
            <Form>
                <Row>
                <Col>
                <h2>Credit Card Holder</h2>
                <p>API_URL: {window._env_.API_URL}</p>
                <Form.Group controlId="formCCHolderName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter name" onChange={this.handleCCHolderInput} value={this.state.ccHolder.name}  />
                    <Form.Text className="text-muted">
                        Name of the Credit Card Holder.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formCCHolderAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control name="age" type="number" placeholder="Enter age" onChange={this.handleCCHolderInput} value={this.state.ccHolder.age} />
                </Form.Group>
                <Form.Group controlId="formCCHolderStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="status" placeholder="Select Status" onChange={this.handleCCHolderInput} value={this.state.ccHolder.status}>
                        {   //Map each statusOption using the eachOption method, which renders the actual content.
                            this.state.statusOptions.map((option, i) => {
                                return <option>{option}</option>;
                            })
                        }
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <h2>Credit Card Line Item</h2>
                <Form.Group controlId="formFraudDataDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Enter transaction description" onChange={this.handleFraudDataInput} value={this.state.fraudData.description} />
                </Form.Group>
                <Form.Group controlId="formFraudDataDescription">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control name="amount" type="number" placeholder="Enter transaction amount" onChange={this.handleFraudDataInput} value={this.state.fraudData.amount} />
                </Form.Group>
                </Col>
                </Row>
                <Row>
                <Button variant="primary" type="button" onClick={this.handleFormSubmit}>
                    Submit
                </Button>
                <Button variant="secondary" type="reset" onClick={this.handleClearForm}>
                    Clear
                </Button>
                </Row>
                <br/>
                <ResponseContainer response={this.state.response} />
            </Form>
        );
    } 
}

const buttonStyle = {
    margin : '10px 10px 10px 10px'
}

export default FormContainer;
