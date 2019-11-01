import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses';

const expenses = [
    {
        id: 1,
        description: 'Beer',
        note: 'Note 1',
        amount: 50,
        createdAt: 0
    }, {
        id: 2,
        description: 'Cofee',
        note: 'Note 2',
        amount: 500,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    }, {
        id: 3,
        description: 'Tax bill',
        note: 'Note 3',
        amount: 150,
        createdAt: moment(0).add(4, 'days').valueOf()
    }];


test('Should filter by text value', () => {
    const filters = {
        text: 'ee',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);
});

test('Should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

test('Should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);
});

test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('Should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});