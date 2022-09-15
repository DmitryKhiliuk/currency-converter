import React, {useEffect, useState} from 'react';
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

    const [quantity, setQuantity] = useState(1)

    let difference = new Date().getTime() - new Date(rate.lastupdate).getTime()
    const currencyMain = ['USD', 'EUR', 'GBP', 'PLN', 'CHF']
    const curKeys = Object.keys(rate.rates).filter(el => el.length === 3)
    const currencyAncillary = curKeys.filter(el => el!=='USD'&&el!=='EUR'&&el!=='GBP'&&el!=='PLN'&&el!=='CHF')
    const currencyCode = currencyMain.concat(currencyAncillary) // placing elements in main positions

    console.log(difference)
    console.log(difference > 14400000)

    useEffect(() => {
        if (!Object.keys(rate.rates).length /*|| difference > 14400000*/) {
            dispatch(fetchRateTC())
            console.log('fetch')
        }
    }, [])


    return (
        <div className={s.appStyle}>
            <Navigation/>
            <Routes>
                <Route path={'/rate'} element={<Rate rate={rate}
                                                     currencyMain={currencyMain}
                                                     currencyCode={currencyCode}
                                                     quantity={quantity}
                                                     setQuantity={setQuantity}/>}/>
                <Route path={'/'} element={<Converter currencyMain={currencyMain}
                                                      currencyCode={currencyCode}
                                                      currencyAncillary={currencyAncillary}
                                                      quantity={quantity}
                                                      setQuantity={setQuantity}/>}/>
            </Routes>

        </div>
    );
}

export default App;
