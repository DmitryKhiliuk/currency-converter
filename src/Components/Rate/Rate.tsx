import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Select} from "antd";
import {fetchRateTC} from "../../App/rate-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../App/store";
import {RateTable} from "./RateTable";
import s from './Rate.module.css'
import '../../flags.css'
import {log} from "util";


export const Rate = () => {

    const dispatch = useAppDispatch();
    const rate = useAppSelector((state) => state.rate)


    let difference = new Date().getTime() - new Date(rate.lastupdate).getTime()
    console.log(difference)

    useEffect(() => {
        if (difference && difference > 14400000) {
            dispatch(fetchRateTC())
        }
    }, [])

    const {Option} = Select;

    const [currencyBase, setCurrencyBase] = useState('USD')

    const handleChange = (value: any) => {
        setCurrencyBase(value)
    };

    const onChange = (value: number) => {
        console.log('changed', value);
    };

    const value = 85.1;

    const usd = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "name",
        minimumFractionDigits: 0
    }).format(value);
    console.log(usd);

    const keys = Object.keys(rate.rates).filter(el => el.length === 3)
    const currencyCode = ['USD', 'EUR', 'GBP', 'PLN', 'CHF', 'BYN'].concat(keys.filter(el => el!=='USD'&&el!=='EUR'&&el!=='GBP'&&el!=='PLN'&&el!=='CHF'&&el!=='BYN')) // placing elements in main positions
    const defaultItem = keys.find(el => el === 'USD')



    return (
        <div className={s.rate}>
            <div className={s.control}>
                <div className={s.controlItem}>
                    <>
                        <div>Base Currency</div>

                        <Select
                            defaultValue={new Intl.NumberFormat("en", {
                                style: "currency",
                                currency: defaultItem,
                                currencyDisplay: "name",
                                minimumFractionDigits: 0
                            }).format(1).substring(1)}
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                        >
                            {currencyCode.map((el, index) => <Option key={index} value={el}>{new Intl.NumberFormat("en", {
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
                <div>
                    <Button type="primary">Apply</Button>
                </div>
            </div>
            <i className="flag-US"></i>
            <RateTable rate={rate} currencyBase={currencyBase}/>
        </div>
    );
};

