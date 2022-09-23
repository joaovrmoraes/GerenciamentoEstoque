import * as React from 'react';
import './button.css';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api/axios.js';
import { Button } from 'react-bootstrap';
import { FcDocument } from 'react-icons/fc'

function LogButton() {
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);
    const [categoria, setCategoria] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        api.get('/filtro')
            .then(async (response) => {
                await
                    setLogs(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [])

    function filterMovimentacao() {
        api.get('/filtro?tipo=' + categoria)
            .then(async (response) => {
                await
                    setLogs(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }

    return (
        <>
            <Button onClick={() => { handleShow(); }} style={{ 'color': 'white' }} variant='dark'>
                <span style={{ 'fontWeight': 'bold' }}> Movimentação </span>
            </Button>
            <Modal show={show}
                onHide={handleClose}
                fullscreen={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FcDocument size={30} className='teste' />Movimentação
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover >
                        <thead className='text-center'>
                            <tr>
                                <th>
                                    <select defaultValue={''} className='text-center' style={{ 'border': '0 none', 'fontWeight': 'bold', 'outline': '0 none' }}
                                        onChange={(e) => { setCategoria(e.target.value); setLogs([]); }} onClick={filterMovimentacao}>
                                        <option value={''} style={{ 'fontWeight': 'bold' }}>Situação</option>
                                        <option value="1" style={{ 'fontWeight': 'bold', 'color': 'red' }}>SAIDA</option>
                                        <option value="0" style={{ 'fontWeight': 'bold', 'color': 'green' }}>ENTRADA</option>
                                    </select>
                                </th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {logs.map((logs) => {
                                return (
                                    <tr key={logs.id}>
                                        <td >
                                            {
                                                logs.situacao ?
                                                    <span style={{ 'fontWeight': 'bold', 'color': 'red' }}>SAIDA</span> : <span style={{ 'fontWeight': 'bold', 'color': 'green' }}>ENTRADA</span>
                                            }
                                        </td>
                                        <td >{logs.nome}</td>
                                        <td >{logs.quantidade}</td>
                                        <td>{logs.data}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default LogButton