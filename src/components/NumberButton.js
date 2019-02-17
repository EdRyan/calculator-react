import React from 'react';
import Button from './Button';

const NumberButton = props => {

    return (
        <Button name={props.number} onClick={() => props.onNumberPressed(props.number)}>
            {props.number}
        </Button>
    );
};

export default NumberButton;