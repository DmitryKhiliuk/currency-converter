import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {rateAPI} from "../Api/api";

export type RatesType = {

}

export type RateResponseType = {
    table: string,
    rates: {
        [key:string]: number
    },
    lastupdate: string

}

export type RateType = RateResponseType & {currencyBase: string}

export const fetchRateTC = createAsyncThunk<RateResponseType>('rate/fetchRate', async(param, thunkAPI) => {
    const res = await rateAPI.getRate()
    try {
        return res.data
    } catch (error) {

    }
})

export const slice = createSlice({
    name: 'rate',
    initialState: {
        table: '',
        rates: {},
        lastupdate: ''

} as RateResponseType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRateTC.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const rateReducer = slice.reducer