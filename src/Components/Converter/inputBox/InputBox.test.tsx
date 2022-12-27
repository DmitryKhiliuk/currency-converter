import React from 'react';
import {render, screen} from "@testing-library/react";
import {InputBox} from "./InputBox";

jest.mock('react-redux')
let startState

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
    it('', () => {
        render(<InputBox currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                         activeButton={'AFN'}
                         oppositeButton={'USD'}
                         callBackButton={jest.fn()}
                         inputValue={1}
                         inputHandler={jest.fn()}
                         value={1}
                         arrayItems={[]}
                         rateForBox={1}/>)
    })
    //const input = screen.getAllByRole('spinbutton')
    screen.debug()
    //console.log(input[0].textContent)
})