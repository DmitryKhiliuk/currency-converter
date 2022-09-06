import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {rateAPI} from "./api";

export type RatesType = {

}

export type RateResponseType = {
    table: string,
    rates: {},
    lastupdate: string

}

export const fetchRateTC = createAsyncThunk<RateResponseType>('rate/fetchRate', async(param, thunkAPI) => {
    const res = await rateAPI.getRate()
    try {
        return res.data
    } catch (error) {

    }
})

export const slice = createSlice({
    name: 'rate',
    initialState: {} as RateResponseType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRateTC.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const rateReducer = slice.reducer