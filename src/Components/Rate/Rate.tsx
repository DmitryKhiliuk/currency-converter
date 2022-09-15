import React, {DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction, useState} from 'react';
import {Button, InputNumber, Select, Typography} from "antd";
import {changeCurrencyBaseAC, RateResponseType} from "../../App/rate-reducer";
import {RateTable} from "./RateTable";
import s from './Rate.module.css'
import '../../flags.css'
import {useAppDispatch, useAppSelector} from "../../App/store";

type RatePropsType = {
    rate: RateResponseType
    currencyMain: string[]
    currencyCode: string[]
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
}

const { Title } = Typography;

export const Rate = (props:RatePropsType) => {

    const dispatch = useAppDispatch();
    const currencyBase = useAppSelector((state) => state.rate.currencyBase)
    const lastUpdate = useAppSelector((state) => state.rate.lastupdate)

    let lastUpdateData= new Date(lastUpdate)

    let defaultValue = currencyBase

    const {Option} = Select;


    console.log(currencyBase)
    const handleChange = (currencyBase: string) => {
        dispatch(changeCurrencyBaseAC({currencyBase}))
    };

    const onChange = (value: number) => {
        props.setQuantity(value);
    };

    const saveCurrencyBase = (currencyBase:string) => {
        dispatch(changeCurrencyBaseAC({currencyBase}))
    }

    return (
        <div className={s.rate}>
            <div className={s.control}>
                <div className={s.controlItem}>
                    <>
                        <div>Base Currency</div>
                        <Select
                            value={defaultValue}
                            style={{
                                width: 250,
                            }}
                            onChange={handleChange}
                        >
                            {props.currencyCode.map((el, index) => <Option key={index} value={el}>{new Intl.NumberFormat("en", {
                                style: "currency",
                                currency: el,
                                currencyDisplay: "name",
                                minimumFractionDigits: 0
                            }).format(1).substring(1)}</Option>)}
                        </Select>
                    </>
                </div>
                <div className={s.controlItem}>
                    <div>Quantity</div>
                    <InputNumber min={1} defaultValue={1} onChange={onChange}/>
                </div>
            </div>
            <RateTable rate={props.rate} currencyBase={currencyBase} quantity={props.quantity} saveCurrencyBase={saveCurrencyBase}/>
            <Title level={5} style={{display: 'inline'}}>Last update</Title>
            <span>{' ' + String(lastUpdateData)}</span>
        </div>
    );
};

