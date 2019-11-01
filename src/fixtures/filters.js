import moment from 'moment';

export const altFilters = {
    text: 'Bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment().add(3, 'days')
};
export const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};