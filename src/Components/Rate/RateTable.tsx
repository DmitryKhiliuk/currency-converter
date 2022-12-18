import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import {Table} from 'antd';
import {ColumnGroupType, ColumnType} from "antd/es/table";
import {format} from "../../utils/utils";
import {RateType} from "../../App/rate-reducer";


type RateTableType = {
    rate: RateType
    currencyBase: string
    quantity: number
    saveCurrencyBase: (text:string) => void

}

export const RateTable = (props: RateTableType) => {

    const handler = (text:string) => {
        props.saveCurrencyBase(text)
    }


    const columns:(ColumnGroupType<DataItemType> | ColumnType<DataItemType>)[] = [
        {
            title: 'Currency Name',
            dataIndex: 'currencyName',
            key: 'currencyName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.currencyName > b.currencyName ? 1 : -1,
            render: (text: string, record: any) => <a onClick={() => handler(record.currencyCode)}>{text}</a>,
            width: '30%',
        },
        {
            title: 'Currency Code',
            dataIndex: 'currencyCode',
            key: 'currencyCode',
            sorter: (a, b) => a.currencyCode > b.currencyCode ? 1 : -1,
            render: (text: string) => <a onClick={() => handler(text)}>{text}</a>,
            width: '20%',


        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            key: 'amount',
            width: '25%',
        },
        {
            title: 'Sum',
            dataIndex: 'sum',
            sorter: (a, b) => a.sum - b.sum,
            key: 'sum',
            width: '25%',
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
            dataItem.amount = format(props.rate.rates[el] / props.rate.rates[props.currencyBase])
            dataItem.sum = format((props.rate.rates[el] / props.rate.rates[props.currencyBase]) * props.quantity)
            return data.push(dataItem)
        }


    })
    return (
        <div style={{color: 'red'}}>
            <Table columns={columns}
                   dataSource={data}
                   />
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