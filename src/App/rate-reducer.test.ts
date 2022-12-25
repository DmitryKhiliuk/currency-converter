import {rateAPI} from "../Api/api";
import {changeCurrencyBaseAC, changeErrorStatusAC, fetchRateTC, rateReducer, RateType} from "./rate-reducer";


jest.mock("../Api/api")
const rateAPIMock = rateAPI as jest.Mocked<typeof rateAPI>

const dispatch = jest.fn()
const thunk = fetchRateTC()
const getState = jest.fn()

let res: any
let initialState: RateType

describe('reducer test', () => {
    beforeEach(() => {
        res = {
            data: [
                {
                    disclaimer: "Usage subject to terms: https://openexchangerates.org/terms",
                    license: "https://openexchangerates.org/license",
                    timestamp: 1671872413,
                    base: "USD",
                    rates: {
                        AED: 3.67241,
                        AFN: 87.499985,
                        USD: 1,
                        EUR: 0.9402,
                        GBR: 0.8234,
                        PLN: 4.3955,
                        CHF: 0.926
                    }
                },
            ]
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

    it('should fethRateTC with resolved response', async () => {
        rateAPIMock.getRate.mockReturnValue(res)
        await thunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(2)
        expect(rateAPIMock.getRate).toBeCalledTimes(1)
        const results = rateAPIMock.getRate.mock.results[0].value.data[0]
        expect(results.base).toBe('USD')
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls
        expect(start[0].type).toBe('rate/fetchRate/pending')
        expect(end[0].type).toBe('rate/fetchRate/fulfilled')
        expect(end[0].payload).toBe(res.data)

    })
    it('should fethRateTC with rejected response', async () => {
        rateAPIMock.getRate.mockRejectedValue({})
        await thunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(3)
        const {calls} = dispatch.mock
        const [start, reject, end] = calls
        expect(start[0].type).toBe('rate/fetchRate/pending')
        expect(end[0].type).toBe('rate/fetchRate/fulfilled')
        expect(reject[0].type).toBe('rate/changeErrorStatusAC')
        expect(reject[0].payload).toEqual({error: true})
    })
    it('extra reducers test', async () => {
        rateAPIMock.getRate.mockReturnValue(res)
        await thunk(dispatch, getState, {})
        const action = dispatch.mock.calls[1][0].payload
        const state = rateReducer(initialState, fetchRateTC.fulfilled(action[0], ''))
        expect(state.currencyBase).toBe('USD')
        expect(state.timestamp).toBe(1671872413)
        expect(Object.keys(state.rates).length).toBe(7)
        console.log(state)
    })
    it('change currency base reducer test', () => {
        const newCurrencyBase: string = 'AFN'
        const action = changeCurrencyBaseAC({currencyBase: newCurrencyBase})
        const state = rateReducer(initialState, action)
        expect(state.currencyBase).toBe('AFN')
    })
    it('change error status reducer test', () => {
        const action = changeErrorStatusAC({error: true})
        const state = rateReducer(initialState, action)
        expect(state.error).toBe(true)
    })

})