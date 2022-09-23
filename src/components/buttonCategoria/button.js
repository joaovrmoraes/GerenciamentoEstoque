import * as React from 'react';
import { FcPlus } from 'react-icons/fc';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api/axios';
import Reload from '../refresh/refresh.js'
import './button.css';

function BotaoCategoria() {
    const [show, setShow] = useState(false);
    const [categ, setCateg] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function Cadastrar() {
        api.post('/categoria', {
            categoria: categ.toLocaleUpperCase()
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
                <FcPlus size={28} />
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group  >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                onChange={(e) => { setCateg(e.target.value) }}
                                value={categ}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="success" onClick={() => { handleClose(); Cadastrar(); Reload() }}>
                        Inserir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default BotaoCategoria