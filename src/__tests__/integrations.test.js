import React from 'react';
import { mount } from 'enzyme';
import App from '../components/App';

let app;

beforeEach(() => {
    app = mount(<App />);
});

afterEach(() => {
    app.unmount();
});

const press = buttonName => {
    const attributeValue = isNaN(buttonName) ? `"${buttonName}"` : buttonName;

    app.find(`button[name=${attributeValue}]`).simulate('click');
    app.update();
};

const checkTotal = number => {
    expect(app.find('div.total').text()).toEqual(number.toString());
};

it('displays 0 at the beginning', () => {
    checkTotal(0);
});

it('evaluates a+b=',() => {
    press(1);
    checkTotal(1);

    press('add');
    checkTotal(1);

    press(4);
    checkTotal(4);

    press('equals');
    checkTotal(5);
});

it('evaluates a*b=',() => {
    press(2);
    checkTotal(2);

    press('multiply');
    checkTotal(2);

    press(5);
    checkTotal(5);

    press('equals');
    checkTotal(10);
});

it('evaluates a/b=',() => {
    press(6);
    checkTotal(6);
    press(4);
    checkTotal(64);

    press('divide');
    checkTotal(64);

    press(4);
    checkTotal(4);

    press('equals');
    checkTotal(16);
});

it('evaluates a-b=',() => {
    press(3);
    checkTotal(3);
    press(3);
    checkTotal(33);
    press(2);
    checkTotal(332);

    press('subtract');
    checkTotal(332);

    press(1);
    checkTotal(1);
    press(7);
    checkTotal(17);

    press('equals');
    checkTotal(315);
});

it('evaluates a=',() => {
    press(9);
    checkTotal(9);
    press(1);
    checkTotal(91);

    press('equals');
    checkTotal(91);
});

it('evaluates a*=',() => {
    press(1);
    checkTotal(1);
    press(2);
    checkTotal(12);

    press('multiply');
    checkTotal(12);

    press('equals');
    checkTotal(144);
});

it('evaluates a+b===',() => {
    press(7);
    checkTotal(7);

    press('add');
    checkTotal(7);

    press(4);
    checkTotal(4);

    press('equals');
    checkTotal(11);

    press('equals');
    checkTotal(15);

    press('equals');
    checkTotal(19);
});