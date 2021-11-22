import React from 'react'

import { Navbar, NavbarBrand } from 'react-bootstrap'

import { GiNightSky } from 'react-icons/gi'

const Rodape = () => {
    return (
        <Navbar className="p-2" bg="dark" fixed="bottom">
            <NavbarBrand className="text-light">
                <GiNightSky/> Órion &copy; - Todos os direitos reservados
            </NavbarBrand>
        </Navbar>
    )
}

export default Rodape