import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
        lastupdate: '',
        currencyBase: ''

} as RateType,
    reducers: {
        changeCurrencyBaseAC(state, action:PayloadAction<{currencyBase: string}>) {
            state.currencyBase = action.payload.currencyBase
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchRateTC.fulfilled, (state, action) => {
            return {...action.payload, currencyBase: 'USD'}
        })
    }
})


export const {
    changeCurrencyBaseAC
} = slice.actions
export const rateReducer = slice.reducer