import React, {useState} from 'react';
import {Button, InputNumber, Select} from "antd";
import {RateResponseType} from "../../App/rate-reducer";
import {RateTable} from "./RateTable";
import s from './Rate.module.css'
import '../../flags.css'

type RatePropsType = {
    rate: RateResponseType
}

export const Rate = (props:RatePropsType) => {

    const [currencyBase, setCurrencyBase] = useState('USD')
    const [quantity, setQuantity] = useState(1)


    let defaultValue = currencyBase

    const {Option} = Select;


    console.log(currencyBase)
    const handleChange = (value: any) => {
        setCurrencyBase(value)
    };

    const onChange = (value: number) => {
        setQuantity(value);
    };


    const curKeys = Object.keys(props.rate.rates).filter(el => el.length === 3)

    const currencyMain = ['USD', 'EUR', 'GBP', 'PLN', 'CHF']
    const currencyCode = currencyMain.concat(curKeys.filter(el => el!=='USD'&&el!=='EUR'&&el!=='GBP'&&el!=='PLN'&&el!=='CHF')) // placing elements in main positions


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
            <RateTable rate={props.rate} currencyBase={currencyBase} quantity={quantity} saveCurrencyBase={saveCurrencyBase}/>
        </div>
    );
};

