import React, {useEffect, useState} from 'react';
import {Button, Card, Dropdown, InputNumber, Menu, Typography} from "antd";
import s from './InputBox.module.css'
import {EllipsisOutlined} from "@ant-design/icons";


type InputBoxPropsType = {
    currencyMain: string[]
    activeButton: string
    oppositeButton: string
    callBackButton: (value:string) => void
    inputValue: number
    inputHandler: (value:number) => void
    value: number
    arrayItems: { key: string, label: string }[]
    rateForBox: number

}


export const InputBox = (props:InputBoxPropsType) => {

    let [nameDropdownButton, setNameDropdownButton] = useState('CZK')

    useEffect(() =>{
        if (!props.currencyMain.find(el => el === props.activeButton)) {
            setNameDropdownButton(props.activeButton)
        }
    }, [])

    const onMenuClick = (e: any) => {
        setNameDropdownButton(e.key)
        props.callBackButton(e.key)
    };

    const onClickHandler = (value: string) => {
       props.callBackButton(value)
    }

    const onChange = (value: number) => {

        props.inputHandler(value)
    }

    const menu = (
        <Menu
            onClick={onMenuClick}
            items={props.arrayItems}
            style={{height: '200px', overflowY: 'scroll'}}
        />
    );

    console.log(props.value)
    return (
        <div>
            <Card>
                <div>
                    {props.currencyMain.map((el, index) => <Button key={index} size={'large'}  onClick={() => onClickHandler(el)} type={el === props.activeButton ? 'primary': 'default'}>{el}</Button>)}
                    <Button size={'large'} onClick={() => onClickHandler(nameDropdownButton)} type={nameDropdownButton === props.activeButton ? 'primary': 'default'}>{nameDropdownButton}</Button>
                    <Dropdown overlay={menu}><Button size={'large'}><EllipsisOutlined /></Button></Dropdown>
                </div>
                <div>
                    <Card style={{width: '100%', textAlign: 'center', marginTop: '10px'}} hoverable={true}>
                        <InputNumber min={0}
                                     defaultValue={1}
                                     onChange={onChange}
                                     value={props.value}
                                     className={s.input}
                                     bordered={false}
                        style={{ width: '100%', fontSize: '32px'}}/>
                    </Card>
                    <Typography.Text type="secondary">{'1' + props.activeButton + ' ' + '=' + ' ' + props.rateForBox + ' ' + props.oppositeButton}</Typography.Text>
                </div>
            </Card>
        </div>
    );
};

