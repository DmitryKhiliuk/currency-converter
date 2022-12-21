import {AppRootStateType} from "./store";
import {selectRate} from "./selectors";

let startState: AppRootStateType

describe('selectors test', () => {
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
    })
    it('rate', () => {
        const endState = selectRate(startState)
        expect(Object.keys(endState.rates).length).toBe(7)
        expect(endState.currencyBase).toBe('AFN')
    })
})