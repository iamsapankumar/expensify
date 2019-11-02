import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
// import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import { app } from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
// let hasRendered = false;
// const renderApp = () => {
//     if (!hasRendered) {
//         ReactDOM.render(jsx, document.getElementById('app'));
//         hasRendered = true;
//     }
// };

ReactDOM.render(jsx, document.getElementById('app'));


app.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Log in');
        // store.dispatch(login(user.uid));
        // store.dispatch(startSetExpenses()).then(() => {
        //     renderApp();
        //     if (history.location.pathname === '/') {
        //         history.push('/dashboard');
        //     }
        // });
    } else {
        console.log('Log out');
        // store.dispatch(logout());
        // renderApp();
        // history.push('/');
    }
});


