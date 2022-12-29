import React from 'react';
import {getByTestId, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Rate} from "./Rate";
import * as reduxHooks from "react-redux";
import {AppRootStateType} from "../../App/store";
import userEvent from "@testing-library/user-event";

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

jest.mock('react-redux')



const mockedSelector = jest.spyOn(reduxHooks, 'useSelector')
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')
const dispatch = jest.fn()

describe('rate component test', () => {
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
    it('rate render test', () => {
        mockedSelector.mockReturnValue(startState.rate)
        const view = render(<MemoryRouter><Rate currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                                                currencyCode={['USD', 'EUR', 'GBP', 'PLN', 'CHF', 'AFN']}
                                                quantity={1}
                                                setQuantity={jest.fn()}/></MemoryRouter>)
        expect(view).toMatchSnapshot()
    })
    it('link table test', () => {
        mockedSelector.mockReturnValue(startState.rate)
        mockedDispatch.mockReturnValue(dispatch)
        const view = render(<MemoryRouter><Rate currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                                                currencyCode={['USD', 'EUR', 'GBP', 'PLN', 'CHF', 'AFN']}
                                                quantity={1}
                                                setQuantity={jest.fn()}/></MemoryRouter>)
        const link = screen.getByText('euro')
        userEvent.click(link)
        const text = screen.getAllByText('euro')
        expect(dispatch).toBeCalledTimes(1)
        const input = screen.getByRole('spinbutton')
        userEvent.type(input,'1')
        expect(input).toHaveValue('11')
        const select = screen.getByTestId('select')
        userEvent.click(select)
        const item = screen.getByText('US dollar')
        userEvent.click(item)
        expect(dispatch).toBeCalledTimes(2)
    })

})