import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
// action generators for expenses reducer
// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
//SET_START_DATE
const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date
});
//SET_END_DATE
const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date
});
// expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};
// filters reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', // date || amount
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            };
        default:
            return state;
    }
};
// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
// store creation && register reducers
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});
const expenseOne = store.dispatch(addExpense({
    description: 'Buy food',
    note: 'Note 1',
    amount: 2500,
    createdAt: -5477
}));
const expenseTwo = store.dispatch(addExpense({
    description: 'rent',
    note: 'Note 2',
    amount: 4500,
    createdAt: 76477777777747
}));
const expenseTree = store.dispatch(addExpense({
    description: 'buy coffy',
    note: 'Note 3',
    amount: 100,
    createdAt: 7647777
}));
// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(1000));
// store.dispatch(removeExpense({
//     id: expenseOne.expense.id
// }));
// store.dispatch(editExpense(
//     expenseTwo.expense.id,
//     {
//         description: 'edited description', note: 'Edited note'
//     }
// ));
// store.dispatch(setTextFilter('buy food'));
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
store.dispatch(sortByDate());
// demo state
// const demoState = {
//     expenses: [{
//         id: '454545',
//         description: 'some description',
//         note: 'some note',
//         amount: 45000,
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'amount', // date || amount
//         startDate: undefined,
//         endDate: undefined
//     }
// };

