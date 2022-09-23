import * as React from 'react';
import './button.css';
import { FcAddDatabase, FcPlus } from 'react-icons/fc';
import { FaPlusCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import api from '../../services/api/axios';
import { InputGroup } from 'react-bootstrap';
import BotaoCategoria from '../buttonCategoria/button.js';
import Reload from '../refresh/refresh';

function BotaoCadastro({ atualizacao }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categoria, setCategoria] = useState([]);

    const [nome, setNome] = useState('');
    const [categori, setCategori] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        api.get('/categoria')
            .then(async (response) => {
                await
                    setCategoria(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [])

    function adicionar() {
        api.post('/cadastrar', {
            nome: nome,
            categoria: categori,
            descricao: descricao
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }

    return (
        <>
            <Button onClick={handleShow} variant='success'>
                <span className="teste2" style={{ 'fontWeight': 'bold' }}>Cadastrar</span>
            </Button>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                onChange={(e) => { setNome(e.target.value) }}
                                value={nome}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Referencia/Descrição</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => { setDescricao(e.target.value) }}
                                value={descricao}
                            />
                        </Form.Group>
                    </Form>
                    <Stack direction="horizontal" className='align-middle' gap={2}>
                        <Form.Group >
                            <Form.Label>Categoria:</Form.Label>
                            <InputGroup>
                                <Form.Select onChange={(e) => { setCategori(e.target.value) }} defaultValue={0}>
                                    <option disabled value={0}>Selecione uma categoria</option>
                                    {
                                        categoria.map((categori) => {
                                            return (
                                                <option key={categori.id} value={categori.categoria}>{categori.categoria}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <InputGroup.Text style={{ 'backgroundColor': 'transparent' }}>
                                    <BotaoCategoria />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Stack>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="success" onClick={() => { handleClose(); adicionar(); Reload() }}>
                        Inserir
                    </Button>
                    <Button variant="danger" onClick={() => { handleClose() }}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default BotaoCadastro