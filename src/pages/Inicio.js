import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

import { apiNasa } from '../constants'

const Inicio = () => {
    const [dadosAPI, setDadosAPI] = useState([])
    const [carregandoDadosAPI, setCarregandoDadosAPI] = useState(false)

    async function obterDadosAPI(){
        setCarregandoDadosAPI(true)
        let url = apiNasa
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setDadosAPI(data)
        })
        .catch(function(error){
            console.error('Erro ao obter os dados: ' + error.message)
        })
        setCarregandoDadosAPI(false)
    }

    useEffect(() => {
        obterDadosAPI()
        document.title = 'Início'
    }, [])

    return (
        <Container fluid className="p-0">
            <Cabecalho/>

            <Row>&nbsp;</Row>
            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={4}>
                    <h3 className="text-center">Seja Bem Vindo!</h3>
                    <h4 className="text-center">Esta é a página inicial do app Órion.</h4>
                </Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={4}>
                    <h3 className="text-center">Imagem astronômica do dia:</h3>
                </Col>
            </Row>
            &nbsp;
            <Row className="justify-content-md-center">
                <Col className="m-auto">
                    <h6 className="text-center">{dadosAPI.title}</h6>
                    <Image src={dadosAPI.url} className="rounded mx-auto d-block" width="25%"/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={4}>
                {Object.keys(dadosAPI)[0] == "copyright"
                    ? <h6 className="text-center">Image Credit & Copyright: {dadosAPI.copyright}</h6>
                    : <h6 className="text-center">No Copyrights </h6>
                }
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={10}>
                <p>Explanation: {dadosAPI.explanation}</p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={10}>
                <p>Data: {new Date(dadosAPI.date).toLocaleDateString()}</p>
                </Col>
            </Row>
            <Rodape/>
        </Container>
    )
}

export default Inicio