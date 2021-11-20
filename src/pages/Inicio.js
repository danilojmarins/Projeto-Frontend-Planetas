import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

const Inicio = () => {
    return (
        <Container fluid className="p-0">
            <Cabecalho/>
            <Row>
                <Col xs={12} lg={6}>
                    <h1>Seja Bem Vindo!</h1>
                    <p>Esta é a página inicial do app Órion.</p>
                    <p>Efetue a consulta/ cadastros/ edição/ exclusão dos planetas através do menu acima.</p>
                </Col>
            </Row>
            <Rodape/>
        </Container>
    )
}

export default Inicio