import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import api from '../../services/api/axios';
import 'react-toastify/dist/ReactToastify.css';
import './button.css';

function BotaoGrafico() {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState([]);

    function troca(movimentacao) {
        if (movimentacao === 0) {
            return 'entrada'
        } else {
            return 'saida'
        }
    }

    const loadData = (data) => {
        //mapeamento e estruturação para os dados no grafico
        const result = _.map(data, (value) => {
            return [troca(value.situacao), value.nome, value.quantidade]
        })
        return [['Movimentação', '', ''], ...result];
    }

    useEffect(() => {
        api.get('/grafico?data=28/09/2022')
            .then(async (response) => {
                await
                    setValue(loadData(response.data))
            }).catch(error => { console.log('erro ao receber lista') })
    }, [])

    console.log(value)

    const options = {
        chart: {
            title: "Comparação de Faturamento.",
        }
    };

    return (
        <>
            <Button onClick={handleShow} variant='success'>
                <span className="teste2" style={{ 'fontWeight': 'bold' }}>Grafico</span>
            </Button>
            <Modal show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="700px"
                        data={value}
                        options={options}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BotaoGrafico