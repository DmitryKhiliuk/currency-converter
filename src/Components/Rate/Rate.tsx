import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Select} from "antd";
import {fetchRateTC} from "../../App/rate-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../App/store";
import {RateTable} from "./RateTable";
import s from './Rate.module.css'
import '../../flags.css'



export const Rate = () => {

    const dispatch = useAppDispatch();
    const rate = useAppSelector((state) => state.rate)

    const [currencyBase, setCurrencyBase] = useState('USD')
    const [quantity, setQuantity] = useState(1)
    let difference = new Date().getTime() - new Date(rate.lastupdate).getTime()
    let defaultValue = currencyBase

    useEffect(() => {
        if (difference && difference > 14400000) {
            dispatch(fetchRateTC())
        }
    }, [])

    const {Option} = Select;


    console.log(currencyBase)
    const handleChange = (value: any) => {
        setCurrencyBase(value)
    };

    const onChange = (value: number) => {
        setQuantity(value);
    };

    const keys = Object.keys(rate.rates).filter(el => el.length === 3)
    const currencyCode = ['USD', 'EUR', 'GBP', 'PLN', 'CHF', 'BYN'].concat(keys.filter(el => el!=='USD'&&el!=='EUR'&&el!=='GBP'&&el!=='PLN'&&el!=='CHF'&&el!=='BYN')) // placing elements in main positions


    const saveCurrencyBase = (text:string) => {
        setCurrencyBase(text)


    }
    const onClickHandler = () => {

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
                    <Button type="primary" onClick={onClickHandler}>Apply</Button>
                </div>
            </div>
            <RateTable rate={rate} currencyBase={currencyBase} quantity={quantity} saveCurrencyBase={saveCurrencyBase}/>
        </div>
    );
};

