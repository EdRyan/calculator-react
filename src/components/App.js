import React from 'react';

import './App.css';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import Button from './Button';
import OperatorIcon from './OperatorIcon';

const DEFAULT_STATE = {
    currentTotal: 0,
    currentInput: '',
    lastInput: '',
    operation: null,
    lastButtonPressed: ''
};

class App extends React.Component {

    state = DEFAULT_STATE;

    onNumberPressed = number => {
        if (this.state.currentInput.length === 16) return;

        this.setState({currentInput: this.state.currentInput.concat(number), lastButtonPressed: number});
    };

    clearEverything = () => {
        this.setState({...DEFAULT_STATE});
    };

    clearCurrentInput = () => {
        this.setState({currentInput:''});
    };

    onOperatorPressed = operation => {
        const newState = {
            currentTotal: this.state.currentTotal,
            lastInput: this.state.lastInput
        };

        if (this.state.currentInput) {
            Object.assign(newState, this.doEquals());
        }

        newState.lastInput = newState.currentTotal;

        newState.operation = operation;
        newState.lastButtonPressed = operation;

        this.setState(newState);
    };

    getNewTotal = (operation, operand) => {
        const currentTotal = this.state.currentTotal;

        return (() => {
            switch (operation) {
                case 'add':
                    return currentTotal + operand;
                case 'multiply':
                    return currentTotal * operand;
                case 'divide':
                    return currentTotal / operand;
                case 'subtract':
                    return currentTotal - operand;
            }
        })();
    };

    doEquals = () => {
        const operation = this.state.operation;
        const currentInput = this.state.currentInput;

        if (!operation) {

            if (!currentInput) {
                return {};
            }

            const newTotal = this.getNewTotal('add', parseInt(currentInput));
            return {
                currentTotal: newTotal,
                currentInput: '',
                lastInput: currentInput,
                lastButtonPressed: 'equals'
            };
        }

        const operand = parseInt(this.state.currentInput || this.state.lastInput);

        const newTotal = this.getNewTotal(operation, operand);

        return {
            currentTotal: newTotal,
            currentInput: '',
            lastInput: currentInput || this.state.lastInput,
            lastButtonPressed: 'equals'
        }
    };

    onEqualsPressed = () => {
        this.setState(this.doEquals());
    };

    onBackspacePressed = () => {
        this.setState({ currentInput : this.state.currentInput.slice(0,-1) });
        //TODO set lastButtonPressed. not critical right now cause mainly used for equals tracking
    };

    handleKeyDown = event => {
        const key = event.key;

        if (key.match(/^\d$/)) {
            this.onNumberPressed(key);
        } else {
            switch (key) {
                case '+':
                    this.onOperatorPressed('add');
                    return;
                case '-':
                    this.onOperatorPressed('subtract');
                    return;
                case '/':
                    this.onOperatorPressed('divide');
                    return;
                case '*':
                    this.onOperatorPressed('multiply');
                    return;
                case 'Enter':
                case '=':
                    this.onEqualsPressed();
                    return;
                case 'Backspace':
                    this.onBackspacePressed();
                    return;
            }
        }
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    renderPreviousInput() {
        if (this.state.operation && this.state.lastButtonPressed !== '' && this.state.lastButtonPressed !== 'equals') {
            return (
                <div>{this.state.currentTotal} <OperatorIcon size="xs" operator={this.state.operation}/></div>
            );
        }
        return <div>&nbsp;</div>;
    }

    render() {
        return (
            <div className="app ui container" style={{marginTop:'10px'}}>
                <div className="ui card">
                    <div className="ui /*celled*/ grid center aligned">
                        <div className="row">
                            <div className="sixteen wide column right aligned">
                                {this.renderPreviousInput()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="sixteen wide column right aligned total">
                                {this.state.currentInput || this.state.currentTotal}
                            </div>
                        </div>
                        <div className="row calc-buttons">
                            <div className="four wide column">
                                <Button name="c" onClick={this.clearEverything}>C</Button>
                            </div>
                            <div className="four wide column">
                                <Button name="ce" onClick={this.clearCurrentInput}>CE</Button>
                            </div>
                            <div className="four wide column">
                                &nbsp;
                            </div>
                            <div className="four wide column">
                                <OperatorButton operator="divide" onOperatorPressed={this.onOperatorPressed} />
                            </div>
                        </div>
                        <div className="row calc-buttons">
                            <div className="four wide column">
                                <NumberButton number={7} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <NumberButton number={8} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <NumberButton number={9} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <OperatorButton operator="multiply" onOperatorPressed={this.onOperatorPressed} />
                            </div>
                        </div>
                        <div className="row calc-buttons">
                            <div className="four wide column">
                                <NumberButton number={4} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <NumberButton number={5} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <NumberButton number={6} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <OperatorButton operator="subtract" onOperatorPressed={this.onOperatorPressed} />
                            </div>
                        </div>
                        <div className="row calc-buttons">
                            <div className="four wide column">
                                <NumberButton number={1} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <NumberButton number={2} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <NumberButton number={3} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                <OperatorButton operator="add" onOperatorPressed={this.onOperatorPressed} />
                            </div>
                        </div>
                        <div className="row calc-buttons">
                            <div className="four wide column">
                                &nbsp;
                            </div>
                            <div className="four wide column">
                                <NumberButton number={0} onNumberPressed={this.onNumberPressed} />
                            </div>
                            <div className="four wide column">
                                &nbsp;
                            </div>
                            <div className="four wide column">
                                <OperatorButton operator="equals" onOperatorPressed={this.onEqualsPressed} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;