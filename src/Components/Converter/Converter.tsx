import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {InputBox} from "./inputBox/InputBox";
import s from './Converter.module.css'
import {changeCurrencyBaseAC, RateResponseType} from "../../App/rate-reducer";
import {useAppDispatch, useAppSelector} from "../../App/store";
import {useDebounce} from "../../hooks";


type ConverterType = {
    currencyCode: string[]
    currencyMain: string[]
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
}

export const Converter = (props:ConverterType) => {

    const currencyBase = useAppSelector((state) => state.rate.currencyBase)
    const rates = useAppSelector((state) => state.rate.rates)
    const dispatch = useAppDispatch();
    const [currencySelected, setCurrencySelected] = useState('USD')
    const [inputValueMain, setInputValueMain] = useState(1)
    const [inputValueSelected, setInputValueSelected] = useState(1)
    const currencyRate = rates[currencySelected]
    const currencyBaseRate = rates[currencyBase]


    useEffect(() => {
        setInputValueSelected(format(inputValueMain * rates[currencySelected]/ rates[currencyBase]))
    }, [])


    const format = (number: number) => +number.toFixed(2)


    const inputMainHandler = (value: number) => {
        setInputValueSelected(format(value * rates[currencySelected]/rates[currencyBase]))
        setInputValueMain(value)
    }

    const inputSelectedHandler = (value:number) => {
        setInputValueMain(format(value * rates[currencyBase]/rates[currencySelected]))
        setInputValueSelected(value)
    }

    const changeCurrencyBase = (currencyBase:string) => {
        dispatch(changeCurrencyBaseAC({currencyBase}))
        setInputValueSelected(format(inputValueMain * rates[currencySelected]/ rates[currencyBase]))
    }


    const changeCurrencySelected = (currencySelected:string) => {
        setCurrencySelected(currencySelected)
        setInputValueMain(format(inputValueSelected * rates[currencyBase]/ rates[currencySelected]))
    }

    return (
        <div className={s.content}>
            <InputBox currencyMain={props.currencyMain}
                      activeButton={currencyBase}
                      callBackButton={changeCurrencyBase}
                      inputValue={props.quantity}
                      inputHandler={inputMainHandler}
                      value={inputValueMain}
                      valueButton={currencyBase}/>

            <InputBox currencyMain={props.currencyMain}
                      activeButton={currencySelected}
                      callBackButton={changeCurrencySelected}
                      inputValue={1}
                      inputHandler={inputSelectedHandler}
                      value={inputValueSelected}
                      valueButton={currencySelected}/>
        </div>
    );
};

