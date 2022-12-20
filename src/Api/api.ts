import axios from "axios";


const instance = axios.create({
    baseURL: 'https://openexchangerates.org/api/',
})


export const rateAPI = {
    getRate() {
        console.log('get')
        return instance.get<RateResponseType>(`latest.json`, {params: {app_id: '9ac9478509834ed58820c2b6688daeca'}})
    }
}

export type RateResponseType = {
    disclaimer: string,
    license: string,
    timestamp: number,
    base: string,
        rates: {
        [key:string]: number
    },


}