import moment from 'moment';
import filterReducer from '../../reducers/filters';

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', // date || amount
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

test('Should setup default filter values', () => {
    const state = filterReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date', // date || amount
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});
test('Should setup filter to filter by amount', () => {
    const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('Should setup filter to filter by date', () => {
    const filtersReducerDefaultState = {
        text: '',
        sortBy: '',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    };
    const state = filterReducer(filtersReducerDefaultState, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date');
});
test('Should set text filter', () => {
    const state = filterReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'Example text' });
    expect(state.text).toBe('Example text');
});
// test('should set startDate filter', () => {
//     const action = {
//         type: 'SET_START_DATE',
//         startDate: moment()
//     };
//     const state = filterReducer(undefined, action);
//     expect(state.startDate).toEqual(action.startDate);
// });