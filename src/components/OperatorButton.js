import React from 'react';
import Button from './Button';
import OperatorIcon from './OperatorIcon';

const OperatorButton = props => {
    return (
        <Button onClick={() => props.onOperatorPressed(props.operator)}>
            <OperatorIcon operator={props.operator}/>
        </Button>
    );
};

export default OperatorButton;