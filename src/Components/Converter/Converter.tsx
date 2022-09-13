import React, {Dispatch, SetStateAction, useState} from 'react';
import {InputBox} from "./inputBox/InputBox";
import s from './Converter.module.css'
import {changeCurrencyBaseAC, RateResponseType} from "../../App/rate-reducer";
import {useAppDispatch, useAppSelector} from "../../App/store";


type ConverterType = {
    currencyCode: string[]
    currencyMain: string[]
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
}

export const Converter = (props:ConverterType) => {

    const currencyBase = useAppSelector((state) => state.rate.currencyBase)
    const dispatch = useAppDispatch();
    const [currencySelected, setCurrencySelected] = useState('USD')

    const changeCurrencyBase = (currencyBase:string) => {
        dispatch(changeCurrencyBaseAC({currencyBase}))
    }

    const changeCurrencySelected = (value:string) => {
        setCurrencySelected(value)
    }

    return (
        <div className={s.content}>
            <InputBox currencyMain={props.currencyMain} activeButton={currencyBase} callBackButton={changeCurrencyBase} inputValue={props.quantity}/>
            <InputBox currencyMain={props.currencyMain} activeButton={currencySelected} callBackButton={changeCurrencySelected} inputValue={1}/>
        </div>
    );
};

