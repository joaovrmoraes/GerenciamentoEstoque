import * as React from 'react';
import { FcAutomatic } from 'react-icons/fc';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api/axios';
import './button.css';
import Reload from '../refresh/refresh';

function BotaoModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [quantidade, setQuantidade] = useState(0)

    const reduzido = localStorage.getItem('reduzido')
    const produto = localStorage.getItem('nome')

    function Entrada() {
        api.put('/addquant', {
            nome: produto,
            quantidade: parseInt(quantidade),
            id: reduzido
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }
    function Saida() {
        api.put('/subquant', {
            nome: produto,
            quantidade: parseInt(quantidade),
            id: reduzido
        })
            .then(async (response) => {
                console.log('ok')
            }).catch(error => {
                console.log('erro')
            })
    }

    return (
        <>
            <button className='edit_button' onClick={handleShow}>
                <FcAutomatic size={26} />
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Movimentação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Produto: {reduzido}</Form.Label>
                            <Form.Control
                                type="email"
                                disabled
                                value={produto}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => { setQuantidade(e.target.value) }}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="success" onClick={() => { Entrada(); handleClose(); Reload() }}>
                        Entrada
                    </Button>
                    <Button variant="danger" onClick={() => { Saida(); handleClose(); Reload() }}>
                        Saida
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default BotaoModal