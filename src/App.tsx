import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Converter} from "./Converter";
import {Rate} from "./Rate";
import {Navigation} from "./Navigation";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Routes>
                <Route path={'/'} element={<Converter/>}/>
                <Route path={'/rate'} element={<Rate/>}/>
            </Routes>

        </div>
    );
}

export default App;
