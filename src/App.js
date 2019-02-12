import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


import FormContainer from './containers/FormContainer';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class App extends Component {
  render() {
    return (
      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      */

      <Container>
        <Row>
          <Jumbotron>
            <h1>Red Hat Process Automation Manager 7</h1>
            <p>
              This is a simple client application to test the rules we've developed in this workshop.
              <br/><br/>
              Please fill in the Credit Card Holder details, and the details of the Credit Card Transaction, and submit the data by clicking on the submit button.
              <br/><br/>
              The RHPAM Execution Server will evaluate the rules and assess:
            </p>
            < ul>
              <li>Whether the transaction is elegible for automated processing.</li>
              <li>The risk rate of the transaction. </li>
            </ul>
          </Jumbotron>
        </Row>
        <FormContainer />
      </Container>
    
    );
  }
}

export default App;
