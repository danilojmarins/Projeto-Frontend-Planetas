import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Inicio from '../pages/Inicio'
import Planetas from '../pages/Planetas'

export default function Rotas(){
    return (
        <HashRouter>
            <Routes>
                <Route exact path='/' element={<Inicio/>} />
                <Route exact path='/planetas' element={<Planetas/>} /> 
            </Routes>
        </HashRouter>
    )
}