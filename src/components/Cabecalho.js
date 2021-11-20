import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { IoMdGlobe, IoMdPlanet } from 'react-icons/io'
import { GiNightSky } from 'react-icons/gi'

const Cabecalho = () => {
    return (
    <Navbar className="p-3" bg="dark" variant="dark">
        <Navbar.Brand><GiNightSky/> Órion</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#/"><IoMdGlobe/> Início</Nav.Link>
            <Nav.Link href="#/planetas"><IoMdPlanet/> Planetas</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default Cabecalho