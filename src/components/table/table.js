import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import BotaoModal from '../button/button';
import api from '../../services/api/axios';
import './table.css';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'
import BotaoCadastro from '../buttonCadastro/button.js';

import LogButton from '../buttonLog/button.js';

function TabelaEstoque() {
    const [itens, setItens] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        api.get('/buscaprodutos?nome=' + busca)
            .then(async (response) => {
                await
                    setItens(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [busca])

    return (
        <>
            <div className='header'>
                <Form className="align-items-center">
                    <Row className="align-items-center">
                        <Col sm={2}>
                            <Row className="align-items-center">
                                <Col sm={7}>
                                    <BotaoCadastro />
                                </Col>
                                <Col sm={5}>
                                    <LogButton />
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
            <Table striped  >
                <thead className='text-center'>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Quantidade</th>
                        <th>Ref/Desc</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {itens.map((itens) => {
                        return (
                            <tr key={itens.id}>
                                <td onClick={() => {
                                    localStorage.setItem('reduzido', itens.id);
                                    localStorage.setItem('nome', itens.nome);
                                }}>
                                    <BotaoModal />
                                </td>
                                <td>{itens.id}</td>
                                <td>{itens.nome}</td>
                                <td>{itens.categoria}</td>
                                <td>{itens.quantidade}</td>
                                <td>{itens.descricao}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default TabelaEstoque