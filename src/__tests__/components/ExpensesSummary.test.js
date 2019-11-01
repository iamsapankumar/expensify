import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should render correctly ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary
        expenseCount={1}
        expenseTotal={235}
    />);
    expect(wrapper).toMatchSnapshot();
});
test('Should render correctly ExpensesSummary with expenses', () => {
    const wrapper = shallow(<ExpensesSummary
        expenseCount={3}
        expenseTotal={10456}
    />);
    expect(wrapper).toMatchSnapshot();
});




