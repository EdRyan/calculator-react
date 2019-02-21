import React from 'react';

const Button = props => {

    const onClick = (event, callback) => {
        event.target.blur();
        if (callback) {
            callback();
        }
    };

    return (
        <button {...props} className="ui button fluid teal"
                onClick={e => onClick(e, props.onClick)}>
            {props.children}
        </button>
    );
};

export default Button;