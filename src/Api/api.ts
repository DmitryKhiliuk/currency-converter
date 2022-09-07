import axios from "axios";

const instance = axios.create({
    baseURL: 'https://cdn.cur.su/api/latest.json'
})

export const rateAPI = {
    getRate() {
        return instance.get('')
    }
}