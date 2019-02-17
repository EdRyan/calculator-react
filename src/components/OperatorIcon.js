import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faDivide, faAsterisk, faPlus, faEquals, faMinus
} from '@fortawesome/free-solid-svg-icons';

library.add(faDivide, faAsterisk, faPlus, faEquals, faMinus);

const getIconName = operator => {
    switch (operator) {
        case 'add':
            return 'plus';
        case 'subtract':
            return 'minus';
        case 'divide':
            return 'divide';
        case 'multiply':
            return 'asterisk';
        case 'equals':
            return 'equals';
    }
    ;
}

const OperatorIcon = props => {
    return <FontAwesomeIcon {...props} icon={getIconName(props.operator)}/>;
};

export default OperatorIcon;