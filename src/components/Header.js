import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => {
    return (
        <header className='header'>
            <div className='content-container'>
                <div className='header__content'>
                    <Link to='/dashboard' className='header__title'>
                        <h1 className='header__title--exact'>Expensify</h1>
                    </Link>
                    <button onClick={startLogout} className='button button--link'>Logout</button>
                </div>
            </div>
        </header>
    );
};
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);