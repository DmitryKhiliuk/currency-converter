import React from 'react';
import {NavLink} from "react-router-dom";

export const Navigation = () => {
    return (
        <div>
            <NavLink to={'/'}>Converter</NavLink>
            <NavLink to={'/rate'}>Rate</NavLink>
        </div>
    );
};

