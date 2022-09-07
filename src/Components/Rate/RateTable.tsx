import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import {Table} from 'antd';
import {useAppSelector} from "../../App/store";
import {RateResponseType} from "../../App/rate-reducer";


type RateTableType = {
    rate: RateResponseType
}

export const RateTable = (props: RateTableType) => {


    const columns = [
        {
            title: 'Currency',
            dataIndex: 'Currency',
            key: 'Currency',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
        },
        {
            title: 'Sum',
            dataIndex: 'Sum',
            key: 'Sum',
        },

    ];



    let data: DataType = []

    const keys: ReadonlyArray<string> = Object.keys(props.rate.rates)

    keys.map((el , index) => {

        let dataItem = {
            key: 0,
            Currency: '',
            Amount: 0,
            Sum: 0,
        }
        dataItem.key = index +1
        dataItem.Currency = el
        dataItem.Amount = props.rate.rates[el]
        return data.push(dataItem)
    })
    return (
        <div>
            <Table columns={columns} dataSource={data}/>;
        </div>

    )
}


type DataItemType = {
    key: number,
    Currency: string,
    Amount: number,
    Sum: number
}

type DataType = DataItemType[]