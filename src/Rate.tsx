import React, {useEffect} from 'react';
import {Button, Select} from "antd";
import {fetchRateTC} from "./rate-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store";



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
    return (
        <div>
            Base Currency
            <Select
                defaultValue="lucy"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
            >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
            </Select>
            <Button type="primary">Apply</Button>
        </div>
    );
};

