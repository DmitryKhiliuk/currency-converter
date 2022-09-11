import React from 'react';
import {Button, Card, Dropdown, Input, Menu, Typography} from "antd";
import s from './InputBox.module.css'

export const InputBox = () => {

    const onMenuClick = (e: any) => {
        console.log('click', e);
    };

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
                <Button size={'large'}>USD</Button>
                <Button size={'large'}>EUR</Button>
                <Button size={'large'}>GBR</Button>
                <Button size={'large'}>CHF</Button>
                <Dropdown.Button size={'large'} overlay={menu}>PLN</Dropdown.Button>
            </div>
            <div>
                <Card style={{width: '400px', textAlign: 'center'}} hoverable={true}>
                    <Input placeholder="Basic usage" />
                    <Typography.Text type="secondary">Ant Design (secondary)</Typography.Text>
                </Card>
            </div>
        </div>
    );
};

