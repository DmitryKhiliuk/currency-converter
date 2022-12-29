import React, {Dispatch, SetStateAction} from 'react';
import {InputNumber, Select, Typography} from "antd";
import {changeCurrencyBaseAC, RateType} from "../../App/rate-reducer";
import {RateTable} from "./RateTable";
import s from './Rate.module.css'
import '../../flags.css'
import {useAppDispatch, useAppSelector} from "../../App/store";
import {selectRate} from "../../App/selectors";

type RatePropsType = {
    currencyMain: string[]
    currencyCode: string[]
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
}

const { Title } = Typography;

export const Rate = (props:RatePropsType) => {

    const dispatch = useAppDispatch();
    const rate = useAppSelector(selectRate)
    const currencyBase = rate.currencyBase
    const lastUpdate = rate.timestamp

    let lastUpdateData = new Date(+(lastUpdate + '000'))

    let defaultValue = currencyBase

    const {Option} = Select;

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
                            data-testid={'select'}
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
            <RateTable rate={rate} currencyBase={currencyBase} quantity={props.quantity} saveCurrencyBase={saveCurrencyBase}/>
            <Title level={5} style={{display: 'inline'}}>Last update</Title>
            <span>{': ' + lastUpdateData}</span>
        </div>
    );
};

