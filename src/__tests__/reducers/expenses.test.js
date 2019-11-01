import moment from 'moment';
import expensesReducer from '../../reducers/expenses';

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

test('Should set default state for expenses', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});
test('Should remove expense by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});
test('Should not remove expenses if id not found', () => {
    const action = { type: 'REMOVE_EXPENSE', id: 54 };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
test('Should add an expense', () => {
    const expense = {
        id: 4,
        description: 'New',
        note: 'Note 4',
        amount: 16500,
        createdAt: 55567858
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});
test('Should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description: 'Updated text'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe('Updated text');
});
test('Should not edit expense if expense is not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 78,
        updates: {
            description: 'Updated text'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});