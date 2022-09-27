import * as React from 'react';
import './button.css';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import api from '../../services/api/axios.js';
import { Button } from 'react-bootstrap';
import { FcDocument } from 'react-icons/fc'
import { FaSearch } from 'react-icons/fa';

function LogButton() {

    const dataatual = new Date();
    const dataDDMMAA = dataatual.toLocaleDateString();
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [busca, setBusca] = useState([]);
    const [data, setData] = useState([]);
    const [dataSelect, setDataSelect] = useState(dataDDMMAA);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        api.get('/filtro?tipo=' + categoria + '&nome=' + busca + '&data=' + dataSelect)
            .then(async (response) => {
                await
                    setLogs(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
        api.get('/data')
            .then(async (response) => {
                await
                    setData(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [busca, dataSelect, categoria])


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
                    <div className='header'>
                        <Form className="align-items-center">
                            <Row className="align-items-center">
                                <Col sm={2}>
                                    <Row className="align-items-center">
                                        <Col sm={7}>
                                        </Col>
                                        <Col sm={5}>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                </Col>
                                <Col sm={6}>
                                    <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                        Pesquisa
                                    </Form.Label>
                                    <InputGroup >
                                        <InputGroup.Text style={{ 'backgroundColor': 'transparent', 'borderRight': '0 none' }}>
                                            <FaSearch size={22} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            id="inlineFormInputGroupUsername"
                                            placeholder="Pesquisa"
                                            style={{ 'borderLeft': '0 none' }}
                                            onChange={(e) => { setBusca(e.target.value) }}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Table striped hover >
                        <thead className='text-center'>
                            <tr>
                                <th>
                                    <select defaultValue={''} className='text-center' style={{ 'border': '0 none', 'fontWeight': 'bold', 'outline': '0 none' }}
                                        onChange={(e) => { setCategoria(e.target.value); setLogs([]); }}>
                                        <option value={''} style={{ 'fontWeight': 'bold' }}>Situação</option>
                                        <option value="1" style={{ 'fontWeight': 'bold', 'color': 'red' }}>SAIDA</option>
                                        <option value="0" style={{ 'fontWeight': 'bold', 'color': 'green' }}>ENTRADA</option>
                                    </select>
                                </th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>
                                    <select defaultValue={''} className='text-center' style={{ 'border': '0 none', 'fontWeight': 'bold', 'outline': '0 none' }}
                                        onChange={(e) => { setDataSelect(e.target.value); setLogs([]); }}>
                                        <option value={''} style={{ 'fontWeight': 'bold' }}>Data</option>
                                        {data.map((date) => {
                                            return (
                                                <option value={date.data} style={{ 'fontWeight': 'bold' }} key={date.data}>{date.data}</option>
                                            )
                                        })}
                                    </select>
                                </th>
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
                                        <td >{logs.data}</td>
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