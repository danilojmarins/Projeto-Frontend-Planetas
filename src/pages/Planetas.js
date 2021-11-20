import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

import { IoMdPlanet } from 'react-icons/io'
import { IoTelescope } from 'react-icons/io5'
import { MdModeEdit, MdDelete, MdSave } from 'react-icons/md'

import {BACKEND} from '../constants'

const Planetas = () => {
    const valorInicial = {nome: '', raioKM: '', numSatelites: '', distanceSolUA: '', tipo: ''}
    const [planeta, setPlaneta] = useState(valorInicial)
    const [planetas, setPlanetas] = useState([])
    const [carregandoPlanetas, setCarregandoPlanetas] = useState(false)
    const [erros, setErros] = useState({})
    const [salvandoPlanetas, setSalvandoPlanetas] = useState(false)
    const [aviso, setAviso] = useState('')
    const [confirmaExclusao, setConfirmaExclusao] = useState(false)

    const { nome, raioKM, numSatelites, distanceSolUA, tipo } = planeta
    
    async function obterPlanetas(){
        setCarregandoPlanetas(true)
        let url = `${BACKEND}/planetas`
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPlanetas(data)
        })
        .catch(function(error){
            console.error('Erro ao obter os planetas: ' + error.message)
        })
        setCarregandoPlanetas(false)
    }

    useEffect(() => {
        obterPlanetas()
        document.title = 'Cadastro de Planetas'
    }, [])

    const validaErrosPlaneta = () => {
        const novosErros = {}

        // Validação do nome
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
        else if (nome === "Plutão" || nome === "plutão") novosErros.nome = 'Plutão não é planeta!'
        
        // Validação do raio
        if (isNaN(parseFloat(raioKM))) novosErros.raioKM = 'O raio deve ser um número!'

        // Validação n° de satélites
        if (isNaN(parseInt(numSatelites))) novosErros.numSatelites = 'O n° de satélites deve ser um número!'

        // Validação da distância
        if (isNaN(parseFloat(distanceSolUA))) novosErros.distanceSolUA = 'A distância deve ser um número!'

        // Validação do tipo
        if (!tipo || tipo === '') novosErros.tipo = 'Escolha um tipo!'

        return novosErros
    }

    async function salvarPlaneta(event){
        event.preventDefault() // evita que a página seja recarregada

        const novosErros = validaErrosPlaneta()
        if (Object.keys(novosErros).length > 0){
            // Sim, temos erros!
            setErros(novosErros)
        } else {
            setSalvandoPlanetas(true)
                const metodo = planeta.hasOwnProperty('_id') ? 'PUT' : 'POST'
                let url = `${BACKEND}/planetas`
                await fetch (url, {
                    method: metodo,
                    headers: {
                        Accept: 'appliction/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(planeta)
                }) .then(response => response.json())
                .then(data => {
                    (data._id || data.message) ? setAviso('Registro salvo com sucesso!') : setAviso('')
                    setPlaneta(valorInicial) // Limpar a tela com os valores iniciais
                    obterPlanetas() // Atualizar a tela com os registros atualizados
                }) .catch(function (error){
                    console.error(`Erro ao salvar o planeta: ${error.message}`)
                })
                setSalvandoPlanetas(false)
        }
    }

    async function excluirPlaneta(){
        let url = `${BACKEND}/planetas/${planeta._id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }) .then(response => response.json())
        .then(data => {
            data.message ? setAviso(data.message) : setAviso('')
            obterPlanetas()
        })
        .catch(function (error) {
            console.error(`Erro ao excluir o planeta: ${error.message}`)
        })
    }

    const alteraDadosPlaneta = e => {
        setPlaneta({...planeta, [e.target.name]: e.target.value})
        setErros({})
    }

    return (
        <Container fluid className="p-0">
            <Cabecalho/>
            &nbsp;
            <Row className="p-3">
                <Col xs={12} lg={6}>
                    {/* Formulário de Planetas */}
                    <h4><IoMdPlanet/> Cadastro dos Planetas</h4>
                    &nbsp;
                    <Form method="post">

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="nome">
                            <Form.Label>Nome do Planeta</Form.Label>
                            <Form.Control name="nome" placeholder="Ex: Júpiter" value={nome} onChange={alteraDadosPlaneta} isInvalid={!!erros.nome}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.nome}
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="raioKM">
                            <Form.Label>Raio do Planeta em Quilômetros</Form.Label>
                            <Form.Control name="raioKM" placeholder="Ex: 6051" value={raioKM} onChange={alteraDadosPlaneta} isInvalid={!!erros.raioKM}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.raioKM}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="numSatelites">
                            <Form.Label>Número de Satélites do Planeta</Form.Label>
                            <Form.Control name="numSatelites" placeholder="Ex: 1" value={numSatelites} onChange={alteraDadosPlaneta} isInvalid={!!erros.numSatelites}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.numSatelites}
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="distanceSolUA">
                            <Form.Label>Distância do Planeta ao Sol em UA</Form.Label>
                            <Form.Control name="distanceSolUA" placeholder="Ex: 5,2" value={distanceSolUA} onChange={alteraDadosPlaneta} isInvalid={!!erros.distanceSolUA}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.distanceSolUA}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                        <Form.Group className="mb-3" controlId="tipo">
                            <Form.Label>Tipo do Planeta</Form.Label> &nbsp;
                            <Form.Check inline type="radio" label="Rochoso" name="tipo" value="rochoso" onChange={alteraDadosPlaneta} isInvalid={!!erros.tipo}/>
                            <Form.Check inline type="radio" label="Gasoso" name="tipo" value="gasoso" onChange={alteraDadosPlaneta} isInvalid={!!erros.tipo}/>
                        </Form.Group>
                        &nbsp;
                        <Button variant="dark" type="submit" 
                            title="Salvar o registro" onClick={(e) => salvarPlaneta(e)}>
                            {salvandoPlanetas
                                ? <><Spinner animation="border" variant="dark" size="sm"/> Aguarde...</>
                                : <><MdSave/> Salvar</>
                            }
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} lg={6}>
                    {/* Listagem de Planetas */}
                    <h4><IoTelescope/> Listagem dos Planetas</h4>
                    &nbsp;
                    {carregandoPlanetas &&
                    <>
                    <Spinner animation="grow" variant="dark"/>
                    <p>Aguarde enquanto os planetas são recarregados...</p>
                    </>}
                    <Table striped bordered>
                        <thead>
                            <tr className="bg-dark text-light">
                                <th>Nome</th>
                                <th>Raio</th>
                                <th>n° Satélites</th>
                                <th>Distância ao Sol</th>
                                <th>Tipo</th>
                                <th>Inclusão</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planetas.map(item => (
                                <tr key={item._id}>
                                    <td>{item.nome}</td>
                                    <td>{new Number(item.raioKM).toLocaleString()} km</td>
                                    <td>{new Number(item.numSatelites).toLocaleString()}</td>
                                    <td>{new Number(item.distanceSolUA).toLocaleString()} UA</td>
                                    <td>{item.tipo}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <Button variant="dark" title="Editar o registro"
                                        onClick={() => setPlaneta(item)}><MdModeEdit/></Button>
                                        &nbsp;
                                        <Button variant="dark" title="Excluir o registro"
                                        onClick={() => {
                                            setConfirmaExclusao(true)
                                            setPlaneta(item)
                                        }}><MdDelete/></Button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-dark text-light">
                                <td colSpan="6">Total de Registros:</td>
                                <td>{planetas.length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Toast
                onClose={() => setAviso('')}
                show={aviso.length > 0}
                animation={false}
                delay={4000}
                autohide
                className="bg-light"
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}>
                <Toast.Header closeButton={false}>Aviso</Toast.Header>
                <Toast.Body>{aviso}</Toast.Body>
            </Toast>
            <Modal animation={false} show={confirmaExclusao}
                onHide={() => setConfirmaExclusao(false)}>
                <Modal.Header>
                    <Modal.Title>Confirmação da Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirma a exclusão do planeta selecionado?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => setConfirmaExclusao(!confirmaExclusao)}>
                        ❌Cancelar
                    </Button>
                    <Button variant="dark" onClick={() => {
                            excluirPlaneta()
                            setConfirmaExclusao(!confirmaExclusao)
                        }}>
                        ✅Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Rodape/>
        </Container>
    )
}

export default Planetas