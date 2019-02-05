import React from 'react';

import './App.css';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';

const DEFAULT_STATE = { currentTotal: 0, currentInput: '', lastInput: '', operation: null };

class App extends React.Component {

    state = DEFAULT_STATE;

    onNumberPressed = number => {
        this.setState({currentInput: this.state.currentInput.concat(number)});
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

        newState.lastInput = this.state.currentTotal;

        newState.operation = operation;

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
                lastInput: currentInput
            };
        }

        const operand = parseInt(this.state.currentInput || this.state.lastInput);

        const newTotal = this.getNewTotal(operation, operand);

        return {
            currentTotal: newTotal,
            currentInput: '',
            lastInput: currentInput || this.state.lastInput
        }
    };

    onEqualsPressed = () => {
        this.setState(this.doEquals());
    };

    render() {
        return (
            <div className="app ui container" style={{marginTop:'10px'}}>
                <div className="ui card">
                    <div className="ui /*celled*/ grid center aligned">
                        <div className="row">
                            <div className="sixteen wide column right aligned total">
                                {this.state.currentInput || this.state.currentTotal}
                            </div>
                        </div>
                        <div className="row calc-buttons">
                            <div className="four wide column">
                                <button className="ui button fluid" onClick={this.clearEverything}>C</button>
                            </div>
                            <div className="four wide column">
                                <button className="ui button fluid" onClick={this.clearCurrentInput}>CE</button>
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