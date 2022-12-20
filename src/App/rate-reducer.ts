import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rateAPI} from "../Api/api";


export type RateType ={
    timestamp: number,
    rates: {
        [key:string]: number
    },
    currencyBase: string
}

export const fetchRateTC = createAsyncThunk('rate/fetchRate', async() => {
    const res = await rateAPI.getRate()
    try {
        return res.data
    } catch (error) {

    }
})

export const slice = createSlice({
    name: 'rate',
    initialState: {
        rates: {},
        timestamp: 0,
        currencyBase: ''

} as RateType,
    reducers: {
        changeCurrencyBaseAC(state, action:PayloadAction<{currencyBase: string}>) {
            state.currencyBase = action.payload.currencyBase
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchRateTC.fulfilled, (state, action) => {
            state.rates = action.payload!.rates
            state.timestamp = action.payload!.timestamp
            state.currencyBase = 'USD'
            return state
        })
    }
})


export const {
    changeCurrencyBaseAC
} = slice.actions
export const rateReducer = slice.reducer