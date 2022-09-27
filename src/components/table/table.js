import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import api from '../../services/api/axios';
import './table.css';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'
import BotaoCadastro from '../buttonCadastro/button.js';
import LogButton from '../buttonLog/button.js';
import { FaMinus, FaPlus } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function TabelaEstoque() {
    const [itens, setItens] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [buscaCate, setBuscaCate] = useState([])
    const [busca, setBusca] = useState('');
    const [produto, setProduto] = useState('');
    const [codigo, setCodigo] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    const notifySuccess = () => {
        toast.success(` Adicionado ${quantidade} UN(${produto})`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const notifyDanger = () => {
        toast.error(` Removido ${quantidade} UN(${produto})`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const notifyWarn = () => {
        toast.warn(`Quantidade igual a 0`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    useEffect(() => {
        api.get(`/buscaprodutos?nome=${busca}&descricao=${busca}&id=${busca}&categoria=${buscaCate}`)
            .then(async (response) => {
                await
                    setItens(response.data)
            }).catch(error => { console.log('erro ao receber lista') })

        api.get('/categoria')
            .then(async (response) => {
                await
                    setCategorias(response.data)
            }).catch(error => { console.log('erro ao receber lista') })
    }, [busca, buscaCate, refreshKey])

    function atualizador() {
        setRefreshKey(oldKey => oldKey + 1);
    }

    function limpar() {
        document.getElementById('campo').value = '';
    }

    function Entrada() {
        if (quantidade === 0) {
            notifyWarn();
        } else {
            api.put('/addquant', {
                nome: produto,
                quantidade: parseInt(quantidade),
                id: codigo
            })
                .then(async (response) => {
                    console.log('ok')
                }).catch(error => {
                    console.log('erro')
                })
            setQuantidade(0);
            atualizador();
            limpar();
            notifySuccess();
        }
    }
    function Saida() {
        if (quantidade === 0) {
            notifyWarn();
        } else {
            api.put('/subquant', {
                nome: produto,
                quantidade: parseInt(quantidade),
                id: codigo
            })
                .then(async (response) => {
                    console.log('ok')
                }).catch(error => {
                    console.log('erro')
                })

            setQuantidade(0);
            atualizador();
            limpar();
            notifyDanger();
        }
    }



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
                        <th>
                            <select defaultValue={''} className='text-center' style={{ 'border': '0 none', 'fontWeight': 'bold', 'outline': '0 none' }}
                                onChange={(e) => { setBuscaCate(e.target.value); setItens([]); }}>
                                <option value={''} style={{ 'fontWeight': 'bold' }}>Categoria</option>
                                {categorias.map((catego) => {
                                    return (
                                        <option value={catego.categoria} style={{ 'fontWeight': 'bold' }} key={catego.id}>{catego.categoria}</option>
                                    )
                                })}
                            </select>
                        </th>
                        <th>Quantidade</th>
                        <th>U.M</th>
                        <th>Ref/Desc</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {itens.map((itens) => {
                        return (
                            <tr key={itens.id}>
                                <td onClick={() => {

                                }}>
                                    {/* <BotaoModal /> */}
                                    <Form>
                                        <Form.Group className="mb-1" >
                                            <input id='campo' className='text-center' style={{ 'maxWidth': '100px' }} onChange={(e) => { setQuantidade(e.target.value); setCodigo(itens.id); setProduto(itens.nome) }} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant='success' size='sm' style={{ 'marginRight': '10px' }} onClick={() => { Entrada(); limpar() }}><FaPlus /></Button>
                                            <Button variant='danger' size='sm' onClick={() => { Saida(); limpar() }}><FaMinus /></Button>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>{itens.id}</td>
                                <td>{itens.nome}</td>
                                <td>{itens.categoria}</td>
                                <td>{itens.quantidade}</td>
                                <td>{itens.um}</td>
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