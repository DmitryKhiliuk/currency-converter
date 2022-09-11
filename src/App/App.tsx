import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {Converter} from "../Components/Converter/Converter";
import {Rate} from "../Components/Rate/Rate";
import {Navigation} from "../Components/Navigation/Navigation";
import s from './App.module.css'
import {useAppDispatch, useAppSelector} from "./store";
import {fetchRateTC} from "./rate-reducer";

function App() {

    const rate = useAppSelector((state) => state.rate)
    const dispatch = useAppDispatch();

    let difference = new Date().getTime() - new Date(rate.lastupdate).getTime()

    console.log(difference)
    console.log(new Date(rate.lastupdate))

    useEffect(() => {
        if (!rate.rates || difference && difference > 14400000) {
            dispatch(fetchRateTC())
            console.log('fetch')
        }
    }, [])
    return (
        <div className={s.appStyle}>
            <Navigation/>
            <Routes>
                <Route path={'/rate'} element={<Rate rate={rate}/>}/>
                <Route path={'/'} element={<Converter/>}/>
            </Routes>

        </div>
    );
}

export default App;
