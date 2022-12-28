import React from 'react';
import {AppRootStateType} from "./store";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import * as reduxHooks from "react-redux";
import App from "./App";
import userEvent from "@testing-library/user-event";
import {Converter} from "../Components/Converter/Converter";
import {RateType} from "./rate-reducer";

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () {
        },
        removeListener: function () {
        }
    };
}; // заглушка

let startState: AppRootStateType
let initialState: RateType

jest.mock('react-redux')
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector')
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')
const dispatch = jest.fn()

describe('app test', () => {

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
        initialState = {
                rates: {},
                timestamp: 0,
                currencyBase: '',
                error: false
            }



    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('app render test', () => {
        mockedSelector.mockReturnValue(startState.rate)
        mockedDispatch.mockReturnValue(dispatch)
        const view = render(<MemoryRouter><App/></MemoryRouter>)
        expect(view).toMatchSnapshot()
    })
    it('should render converter component', () => {
        mockedSelector.mockReturnValue(startState.rate)
        mockedDispatch.mockReturnValue(dispatch)
        render(<MemoryRouter><App/></MemoryRouter>)
        /*const view = render(<MemoryRouter><Converter currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                                                     currencyCode={['USD', 'EUR', 'GBP', 'PLN', 'CHF','AFN']}
                                                     currencyAncillary={['AED','AFN']}
                                                     quantity={1}
                                                     setQuantity={jest.fn()}
        /></MemoryRouter>)*/
        const input = screen.getAllByRole('spinbutton')
        const converterLink = screen.getByText('Converter')
        userEvent.click(converterLink)
        expect(input.length).toBe(2)
    })
    it('should render rate component', () => {
        mockedSelector.mockReturnValue(startState.rate)
        mockedDispatch.mockReturnValue(dispatch)
        render(<MemoryRouter><App/></MemoryRouter>)
        const rateLink = screen.getByText('Rate')
        userEvent.click(rateLink)
        const input = screen.getByRole('spinbutton')
        const text = screen.getByText(/Last update/i)
        expect(input).toBeInTheDocument()
        expect(text).toBeInTheDocument()

    })
    it('dispatch fetch rate', () => {
        startState.rate = initialState
        mockedSelector.mockReturnValue(startState.rate)
        mockedDispatch.mockReturnValue(dispatch)
        render(<MemoryRouter><App/></MemoryRouter>)
        expect(dispatch).toBeCalledTimes(1)
        console.log(dispatch.mock.calls)
    })
    it('error message test', () => {
        startState = {...startState, rate: {...startState.rate, error: true}}
        mockedSelector.mockReturnValue(startState.rate)
        mockedDispatch.mockReturnValue(dispatch)
        render(<MemoryRouter><App/></MemoryRouter>)
        const message = screen.getByText('Error')
        expect(message).toBeInTheDocument()
    })


})