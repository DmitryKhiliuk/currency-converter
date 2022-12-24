import React from 'react';
import axios, {AxiosResponse} from "axios";
import {RateResponseType} from "../Api/api";
import {fetchRateTC} from "./rate-reducer";
import {rateAPI} from "../Api/api";
import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";



//jest.mock("../Api/api")
//const rateAPIMock = rateAPI as jest.Mocked<typeof rateAPI>

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

const dispatch = jest.fn()
const thunk = fetchRateTC()
const getState = jest.fn()


let res: RateResponseType

describe('reducer test', () => {
    beforeEach(() => {
        res = {
            disclaimer: "Usage subject to terms: https://openexchangerates.org/terms",
            license: "https://openexchangerates.org/license",
            timestamp: 1671872413,
            base: "USD",
            rates: {
                AED:3.67241,
                AFN:87.499985,
                USD:1,
                EUR:0.9402,
                GBR:0.8234,
                PLN:4.3955,
                CHF:0.926
            },
        }
        //mockedAxios.get.mockResolvedValue(() => Promise.resolve({data: res}))

    })

    it('should fethRateTC with resolved response', async () => {

        //rateAPIMock.getRate.mockReturnValue(Promise.resolve(res))
        mockedAxios.get.mockReturnValue(Promise.resolve(res))
        await thunk(dispatch, getState, {})
        console.log(dispatch.mock.calls)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(3)
        const [start,error, end] = calls
        expect(start[0].type).toBe('rate/fetchRate/pending')
        expect(end[0].type).toBe('rate/fetchRate/fulfilled')
        //expect(mockedAxios.get).toBeCalledTimes(1)

    })
})