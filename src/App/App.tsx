import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Converter} from "../Components/Converter/Converter";
import {Rate} from "../Components/Rate/Rate";
import {Navigation} from "../Components/Navigation/Navigation";
import s from './App.module.css'
import './App.less';
import {useAppDispatch, useAppSelector} from "./store";
import {changeErrorStatusAC, fetchRateTC} from "./rate-reducer";
import {selectRate} from "./selectors";
import {Alert} from "antd";

function App() {

    const rate = useAppSelector(selectRate)
    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState(1)

    let difference = new Date().getTime() - +(rate.timestamp + '000')
    const currencyMain = ['USD', 'EUR', 'GBP', 'PLN', 'CHF']
    const curKeys = Object.keys(rate.rates).filter(el => el.length === 3)
    const currencyAncillary = curKeys.filter(el => el!=='USD'&&el!=='EUR'&&el!=='GBP'&&el!=='PLN'&&el!=='CHF')
    const currencyCode = currencyMain.concat(currencyAncillary) // placing elements in main positions

    const error = rate.error

    useEffect(() => {
        if (!Object.keys(rate.rates).length /*|| difference > 14400000*/) {
            dispatch(fetchRateTC())
            console.log('fetch')
        } else {
            dispatch(changeErrorStatusAC({error: false}))
        }
    }, [])


    return (
        <div className={s.appStyle}>
            {error && <Alert message="Error" type="error" showIcon/>}
            <Navigation/>
            <Routes>
                <Route path={'/rate'} element={<Rate currencyMain={currencyMain}
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
