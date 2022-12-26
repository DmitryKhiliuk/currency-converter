import React from 'react';
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "../../App/App";
import {Converter} from "./Converter";

describe('', () => {
    it('', () => {
        const view = render(<MemoryRouter><Converter currencyMain={['USD', 'EUR', 'GBP', 'PLN', 'CHF']}
                                                     currencyCode={['USD', 'EUR', 'GBP', 'PLN', 'CHF','AFN']}
                                                     currencyAncillary={['AED','AFN']}
                                                     quantity={1}
                                                     setQuantity={jest.fn()}
        /></MemoryRouter>)
        
    })
})