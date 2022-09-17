import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {InputBox} from "./inputBox/InputBox";
import s from './Converter.module.css'
import {changeCurrencyBaseAC, RateResponseType} from "../../App/rate-reducer";
import {useAppDispatch, useAppSelector} from "../../App/store";
import {useDebounce} from "../../hooks";
import {format} from "../../utils/utils";


type ConverterType = {
    currencyCode: string[]
    currencyMain: string[]
    currencyAncillary: string[]
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


    useEffect(() => {
        setInputValueSelected(format(inputValueMain * rates[currencySelected]/ rates[currencyBase]))
    }, [])

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
        setInputValueSelected(format(inputValueMain * rates[currencySelected]/ rates[currencyBase]))
    }

    let arrayItems:{ key: string, label: string }[] = []
    props.currencyAncillary.map((el,index) => arrayItems.push({key: el, label: new Intl.NumberFormat("en", {
            style: "currency",
            currency: el,
            currencyDisplay: "name",
            minimumFractionDigits: 0
        }).format(1).substring(1)}))

    const rateForBoxMain = format(rates[currencySelected]/rates[currencyBase])
    const rateForBoxSelected = format(1/rates[currencySelected]/rates[currencyBase])

    return (
        <div className={s.content}>
            <InputBox currencyMain={props.currencyMain}
                      activeButton={currencyBase}
                      oppositeButton={currencySelected}
                      callBackButton={changeCurrencyBase}
                      inputValue={props.quantity}
                      inputHandler={inputMainHandler}
                      value={inputValueMain}
                      arrayItems={arrayItems}
                      rateForBox={rateForBoxMain}
                      />

            <InputBox currencyMain={props.currencyMain}
                      activeButton={currencySelected}
                      oppositeButton={currencyBase}
                      callBackButton={changeCurrencySelected}
                      inputValue={1}
                      inputHandler={inputSelectedHandler}
                      value={inputValueSelected}
                      arrayItems={arrayItems}
                      rateForBox={rateForBoxSelected}

                      />
        </div>
    );
};

