import React from 'react';
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Navigation} from "./Navigation";

describe('navigation component test', () => {
    it('app render test', () => {
        const view = render(<MemoryRouter><Navigation/></MemoryRouter>)
        expect(view).toMatchSnapshot()
    })
    it('buttons render test', () => {
        render(<MemoryRouter><Navigation/></MemoryRouter>)
        const allButtons = screen.getAllByRole('button')
        const btnConverter = screen.getByText('Converter')
        const btnRate = screen.getByText('Rate')
        expect(allButtons.length).toBe(2)
        expect(btnConverter).toBeInTheDocument()
        expect(btnRate).toBeInTheDocument()
    })
})