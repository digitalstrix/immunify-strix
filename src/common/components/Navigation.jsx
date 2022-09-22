import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
    return (
        <nav>
            <ul>
                <li key='dashboard'><Link to="/">Dashboard</Link></li>
                <li key='registration'><Link to="/registration">Registation</Link></li>
                <li key='child-vaccination'><Link to="/child-vaccination">Child Vaccination</Link></li>
                <li key='reports'><Link to="/reports">Reports</Link></li>
                <li key='request-vaccines'><Link to="/request-vaccines">Request New Vaccines</Link></li>
                <li key='order-devices'><Link to="/users">Order Devices</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;