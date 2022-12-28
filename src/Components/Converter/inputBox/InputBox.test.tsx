import React from 'react';
import {render, screen} from "@testing-library/react";
import {InputBox} from "./InputBox";
import {AppRootStateType} from "../../../App/store";
import * as reduxHooks from "react-redux";

jest.mock('react-redux')
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector')


const onChange = jest.fn()

let startState: AppRootStateType

describe('input box component test', () => {
    beforeEach(() => {
        startState = {
            rate: {
                rates: {
                    AED: 3.67241,
                    AFN: 87.499985,
                    USD: 1,
                    EUR: 0.9402,
                    GBR: 0.8234,
                    PLN: 4.3955,
                    CHF: 0.926
                },
                timestamp: 1671390002,
                currencyBase: 'AFN',
                error: false
            }
        }
    })
    it('fdsfdsf', () => {
        mockedSelector.mockReturnValue(startState.rate)
        const view = render(<InputBox currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                         activeButton={'AFN'}
                         oppositeButton={'USD'}
                         callBackButton={jest.fn()}
                         inputValue={1}
                         inputHandler={onChange}
                         value={1}
                         arrayItems={[{key: 'AED', label: ' UAE dirham'}, {key: 'AFN', label: ' Afghan Afghani'}]}
                         rateForBox={0.0113}/>)
    })
    const btn = screen.getAllByRole('button')
})