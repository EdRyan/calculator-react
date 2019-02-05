import React from 'react';
import Button from './Button';

const NumberButton = props => {

    return (
        <Button onClick={() => props.onNumberPressed(props.number)}>
            {props.number}
        </Button>
    );
};

export default NumberButton;