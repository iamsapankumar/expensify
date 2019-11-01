import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
);
// function which wrapp Info component for admin info
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info.Please dont share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};
// function which wrapp Info component AuthInfo
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <p>Welcome.You are logged in</p> : <p>First you must log in!</p>}
            {props.isAuthenticated && <WrappedComponent {...props} />}
        </div>
    );
};
// Higher Order Component
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} info='info from props' />, document.getElementById('app'));