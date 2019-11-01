import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    setExpenses,
    startAddExpense,
    addExpense,
    startRemoveExpense,
    removeExpense,
    editExpense,
    startEditExpense
} from '../../actions/expenses';
import expensesReducer from '../../reducers/expenses';
import expenses from '../../fixtures/expenses';
import db from '../../firebase/firebase';


const uid = 'testuid';
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    db.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

// remove expense test
test('Should setup remove expense action object', () => {
    const action = removeExpense({ id: 'abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc'
    });
});
// edit expense test 
test('Should setup edited expense action object', () => {
    const action = editExpense('123abc', { note: 'some updates' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'some updates'
        }
    });
});
// add expense test
test('Should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to db and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const expenseData = {
        description: 'Desc 1',
        amount: 500,
        note: '',
        createdAt: 678568
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});
test('should add expense with defaults to db and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const expenseDefault = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    store.dispatch(startAddExpense(expenseDefault)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });
        return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
    });
});
test('should setup set expense object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});

test('should remove expense by id from db', (done) => {
    const store = createMockStore({ auth: { uid } });
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return db.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

// test('should edit expense from firebase', (done) => {
//     const store = createMockStore({ auth: { uid } });
//     const id = expenses[0].id;
//     const updates = { amount: 21045 };
//     store.dispatch(startEditExpense(id, updates)).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'EDIT_EXPENSE',
//             id,
//             updates
//         });
//         return db.ref(`users/${uid}/expenses/${id}`).once('value');
//     }).then((snapshot) => {
//         expect(snapshot.val().amount).toEqual(updates.amount);
//         done();
//     });
// });