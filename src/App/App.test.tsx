import React from 'react';
import {AppRootStateType} from "./store";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import * as reduxHooks from "react-redux";
import App from "./App";

let startState: AppRootStateType

jest.mock('react-redux')
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector')
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')

describe('app test', () => {
    beforeEach(() => {
        startState = {
            rate: {
                rates: {
                    AED:3.67241,
                    AFN:87.499985,
                    USD:1,
                    EUR:0.9402,
                    GBR:0.8234,
                    PLN:4.3955,
                    CHF:0.926
                },
                timestamp: 1671390002,
                currencyBase: 'AFN'
            }
        }
        mockedSelector.mockReturnValue(startState.rate)
    })
    it('app render test', () => {
        const view = render(<MemoryRouter><App/></MemoryRouter>)
        expect(view).toMatchSnapshot()
    })
})