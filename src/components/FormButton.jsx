import React from 'react';  
import Button from 'react-bootstrap/Button';


/*Button.jsx */
const FormButton = (props) => {
    console.log(props.style);
    return(
        <Button 
            variant="primary"
            style= {props.style} 
            onClick= {props.action}>    
            {props.title} 
        </Button>)
}

export default FormButton;