import * as React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { FcAddDatabase, FcBarChart } from "react-icons/fc"
import LogButton from '../buttonLog/button.js';
import './navbar.css'

function NavigateBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <span className='logo'>Truck Center</span>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Container>
        </Navbar>
    );
}

export default NavigateBar;