import React from 'react';

const NumberButton = props => {

    return (
        <button className="ui button fluid"
                onClick={() => props.onNumberPressed(props.number)}>
            {props.number}
        </button>
    );
};

export default NumberButton;