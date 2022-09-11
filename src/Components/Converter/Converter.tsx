import React from 'react';
import {InputBox} from "./inputBox/InputBox";
import s from './Converter.module.css'

export const Converter = () => {

    return (
        <div className={s.content}>
            <InputBox/>
            <InputBox/>
        </div>
    );
};

