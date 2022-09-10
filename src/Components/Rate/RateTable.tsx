import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import {Table} from 'antd';
import {RateResponseType} from "../../App/rate-reducer";


type RateTableType = {
    rate: RateResponseType
    currencyBase: string
    quantity: number
    saveCurrencyBase: (text:string) => void

}

export const RateTable = (props: RateTableType) => {

    const handler = (text:string) => {
        props.saveCurrencyBase(text)
    }


    const columns = [
        {
            title: 'Currency Name',
            dataIndex: 'currencyName',
            key: 'currencyName',
            render: (text: string, record: any) => <a onClick={() => handler(record.currencyCode)}>{text}</a>,
        },
        {
            title: 'Currency Code',
            dataIndex: 'currencyCode',
            key: 'currencyCode',
            render: (text: string) => <a onClick={() => handler(text)}>{text}</a>


        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Sum',
            dataIndex: 'sum',
            key: 'sum',
        },

    ];


    let data: DataType = []

    const keys = Object.keys(props.rate.rates)

    keys.map((el, index) => {

        if (el.length === 3) {
            let dataItem = {
                key: 0,
                currencyName: '',
                currencyCode: '',
                amount: 0,
                sum: 0,
            }
            dataItem.key = index + 1
            dataItem.currencyName = new Intl.NumberFormat("EN", {
                style: "currency",
                currency: el,
                currencyDisplay: "name",
                minimumFractionDigits: 0
            }).format(1).substring(1)
            dataItem.currencyCode = el
            dataItem.amount = props.rate.rates[el] / props.rate.rates[props.currencyBase]
            dataItem.sum = (props.rate.rates[el] / props.rate.rates[props.currencyBase]) * props.quantity
            return data.push(dataItem)
        }


    })
    return (
        <div>
            <Table columns={columns}
                   dataSource={data}
                   />;
        </div>

    )
}


type DataItemType = {
    key: number,
    currencyName: string,
    currencyCode: string,
    amount: number,
    sum: number
}

type DataType = DataItemType[]