import React, {ChangeEventHandler, useState} from 'react';
import {Button, Card, Dropdown, Input, InputNumber, Menu, Typography} from "antd";
import {changeCurrencyBaseAC} from "../../../App/rate-reducer";
import {useAppDispatch, useAppSelector} from "../../../App/store";


type InputBoxPropsType = {
    currencyMain: string[]
    activeButton: string
    callBackButton: (value:string) => void
    inputValue: number
}


export const InputBox = (props:InputBoxPropsType) => {



    const onMenuClick = (e: any) => {
        console.log('click', e);
    };

    const onClickHandler = (value: string) => {
       props.callBackButton(value)
    }

    const menu = (
        <Menu
            onClick={onMenuClick}
            items={[
                {
                    key: '1',
                    label: '1st item',
                },
                {
                    key: '2',
                    label: '2nd item',
                },
                {
                    key: '3',
                    label: '3rd item',
                },
            ]}
        />
    );
    return (
        <div>
            <div>
                {props.currencyMain.map((el, index) => <Button key={index} size={'large'} onClick={() => onClickHandler(el)} type={el === props.activeButton ? 'primary': 'default'}>{el}</Button>)}
                <Dropdown.Button size={'large'} overlay={menu}>BYN</Dropdown.Button>
            </div>
            <div>
                <Card style={{width: '400px', textAlign: 'center'}} hoverable={true}>
                    <InputNumber min={1} defaultValue={1} value={props.inputValue}/>
                    <Typography.Text type="secondary">Ant Design (secondary)</Typography.Text>
                </Card>
            </div>
        </div>
    );
};

