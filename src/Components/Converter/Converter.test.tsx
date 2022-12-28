import React, {useState} from 'react';
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "../../App/App";
import {Converter} from "./Converter";
import {AppRootStateType} from "../../App/store";
import * as reduxHooks from "react-redux";
import * as converterHooks from "./Converter";
import userEvent from "@testing-library/user-event";
import {reactHooksModule} from "@reduxjs/toolkit/dist/query/react";


let startState: AppRootStateType
jest.mock('react-redux')


const mockedSelector = jest.spyOn(reduxHooks, 'useSelector')
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')


const setCurrencySelected = jest.fn()
const dispatch = jest.fn()

describe('converter component test', () => {
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
    it('change currency base test', () => {
        mockedSelector.mockReturnValue(startState.rate)
        mockedDispatch.mockReturnValue(dispatch)
        const view = render(<MemoryRouter><Converter currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                                                     currencyCode={['USD', 'EUR', 'GBP', 'PLN', 'CHF','AFN']}
                                                     currencyAncillary={['AED','AFN']}
                                                     quantity={1}
                                                     setQuantity={jest.fn()}
        /></MemoryRouter>)
        const btnEUR = screen.getAllByText('EUR')
        userEvent.click(btnEUR[0])
        expect(dispatch).toBeCalledTimes(1)
    })
    it('change currency selected test', () => {
        mockedSelector.mockReturnValue(startState.rate)
        const view = render(<MemoryRouter><Converter currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                                                     currencyCode={['USD', 'EUR', 'GBP', 'PLN', 'CHF','AFN']}
                                                     currencyAncillary={['AED','AFN']}
                                                     quantity={1}
                                                     setQuantity={jest.fn()}
        /></MemoryRouter>)
        const btnEUR = screen.getAllByText('EUR')
        userEvent.click(btnEUR[1])
        const text = screen.getByText(/1EUR/i)
        expect(text).toBeInTheDocument()
    })
    it('change currency input test', () => {
        mockedSelector.mockReturnValue(startState.rate)
        const view = render(<MemoryRouter><Converter currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                                                     currencyCode={['USD', 'EUR', 'GBP', 'PLN', 'CHF','AFN']}
                                                     currencyAncillary={['AED','AFN']}
                                                     quantity={13}
                                                     setQuantity={jest.fn()}
        /></MemoryRouter>)
        const input = screen.getAllByRole('spinbutton')
        expect(input.length).toBe(2)
        expect(input[0]).toHaveValue('1')
        expect(input[1]).toHaveValue('0.0114')
        userEvent.type(input[0], '1')
        expect(input[0]).toHaveValue('11')
        expect(input[1]).toHaveValue('0.1257')
        userEvent.type(input[1], '1')
        expect(input[1]).toHaveValue('0.12571')
        expect(input[0]).toHaveValue('10.9996')

    })
})