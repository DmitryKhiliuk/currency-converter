import React from 'react';
import {NavLink, useMatch} from "react-router-dom";
import s from './Navigation.module.css'
import {Button} from "antd";

export const Navigation = () => {

    const match = useMatch('/rate')

    return (
        <div className={s.navigation}>
            <NavLink to={'/'} ><Button size={'large'} className={s.button} type={!match ? 'primary' : 'default'}>Converter</Button></NavLink>
            <NavLink to={'/rate'}> <Button size={'large'} className={s.button} type={match ? 'primary' : 'default'}>Rate</Button></NavLink>
        </div>
    );
};

