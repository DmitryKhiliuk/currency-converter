import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import {Table} from 'antd';
import {useAppSelector} from "../../App/store";
import {RateResponseType} from "../../App/rate-reducer";


type RateTableType = {
    rate: RateResponseType
    currencyBase: string
}

export const RateTable = (props: RateTableType) => {


    const columns = [
        {
            title: 'Currency Name',
            dataIndex: 'CurrencyName',
            key: 'CurrencyName',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Currency Code',
            dataIndex: 'CurrencyCode',
            key: 'CurrencyCode',
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

    const keys = Object.keys(props.rate.rates)

    keys.map((el , index) => {

        if (el.length === 3) {
            let dataItem = {
                key: 0,
                CurrencyName: '',
                CurrencyCode: '',
                Amount: 0,
                Sum: 0,
            }
            dataItem.key = index + 1
            dataItem.CurrencyName = new Intl.NumberFormat("EN", {style: "currency", currency: el, currencyDisplay: "name", minimumFractionDigits: 0}).format(1).substring(1)
            dataItem.CurrencyCode = el
            dataItem.Amount = props.rate.rates[el]/props.rate.rates[props.currencyBase]
            return data.push(dataItem)
        }


    })
    return (
        <div>
            <Table columns={columns} dataSource={data}/>;
        </div>

    )
}


type DataItemType = {
    key: number,
    CurrencyName: string,
    CurrencyCode: string,
    Amount: number,
    Sum: number
}

type DataType = DataItemType[]