import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rateAPI} from "../Api/api";


export type RateType ={
    timestamp: number,
    rates: {
        [key:string]: number
    },
    currencyBase: string
    error: boolean
}

export const fetchRateTC = createAsyncThunk('rate/fetchRate', async(_, ThunkAPI) => {
    try {
        const res = await rateAPI.getRate()
        return res.data
    } catch (error) {
        ThunkAPI.dispatch(changeErrorStatusAC({error: true}))
    }
})

export const slice = createSlice({
    name: 'rate',
    initialState: {
        rates: {},
        timestamp: 0,
        currencyBase: '',
        error: false

} as RateType,
    reducers: {
        changeCurrencyBaseAC(state, action:PayloadAction<{currencyBase: string}>) {
            state.currencyBase = action.payload.currencyBase
        },
        changeErrorStatusAC(state, action:PayloadAction<{error: boolean}>) {
            state.error = action.payload.error
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
    changeCurrencyBaseAC,
    changeErrorStatusAC
} = slice.actions
export const rateReducer = slice.reducer