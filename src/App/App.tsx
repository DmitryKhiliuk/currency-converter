import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Converter} from "../Components/Converter/Converter";
import {Rate} from "../Components/Rate/Rate";
import {Navigation} from "../Components/Navigation/Navigation";
import s from './App.module.css'

function App() {
    return (
        <div className={s.appStyle}>
            <Navigation/>
            <Routes>
                <Route path={'/'} element={<Converter/>}/>
                <Route path={'/rate'} element={<Rate/>}/>
            </Routes>

        </div>
    );
}

export default App;
