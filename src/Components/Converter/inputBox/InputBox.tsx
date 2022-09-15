import React, {useState} from 'react';
import {Button, Card, Dropdown, InputNumber, Menu, Typography} from "antd";
import s from './InputBox.module.css'


type InputBoxPropsType = {
    currencyMain: string[]
    activeButton: string
    callBackButton: (value:string) => void
    inputValue: number
    inputHandler: (value:number) => void
    value: number
    arrayItems: { key: string, label: string }[]

}


export const InputBox = (props:InputBoxPropsType) => {

    let [nameDropdownButton, setNameDropdownButton] = useState('CZK')

    const onMenuClick = (e: any) => {
        setNameDropdownButton(e.key)
        props.callBackButton(e.key)
        console.log('click', e);
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
            <div>
                {props.currencyMain.map((el, index) => <Button key={index} size={'large'}  onClick={() => onClickHandler(el)} type={el === props.activeButton ? 'primary': 'default'}>{el}</Button>)}
                <Dropdown.Button size={'large'} overlay={menu} type={nameDropdownButton === props.activeButton ? 'primary': 'default'}>{nameDropdownButton}</Dropdown.Button>
            </div>
            <div>
                <Card style={{width: '400px', textAlign: 'center'}} hoverable={true}>
                    <InputNumber min={1} defaultValue={1} onChange={onChange} value={props.value} className={s.input}/>
                    <Typography.Text type="secondary">Ant Design (secondary)</Typography.Text>
                </Card>
            </div>
        </div>
    );
};

