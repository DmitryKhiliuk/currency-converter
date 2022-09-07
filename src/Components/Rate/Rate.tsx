import React, {useEffect} from 'react';
import {Button, Input, InputNumber, Select} from "antd";
import {fetchRateTC} from "../../App/rate-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../App/store";
import {RateTable} from "./RateTable";
import s from './Rate.module.css'
import '../../flags.css'




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

    const { Option } = Select;

    const handleChange = (value:any) => {
        console.log(`selected ${value}`);
    };

    const onChange = (value: number) => {
        console.log('changed', value);
    };
    return (
        <div className={s.rate}>
            <div className={s.control}>
                <div className={s.controlItem}>
                    <div>Base Currency</div>
                    <Select
                        defaultValue="Dollar"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                    >
                        <Option value="Dollar">Dollar</Option>
                        <Option value="Euro">Euro</Option>
                        <Option value="Tugrik">Tugrik</Option>
                    </Select>
                </div>
                <div className={s.controlItem}>
                    <div>Quantity</div>
                    <InputNumber min={1}  defaultValue={1} onChange={onChange}   />
                </div>
                <div>
                    <Button type="primary">Apply</Button>
                </div>
            </div>
            <i className="flag-US"></i>
            <RateTable rate={rate}/>
        </div>
    );
};

