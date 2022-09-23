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
                    <span className='logo'></span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="justify-content-end teste2">
                    <Nav.Link href="#" className='cadastro'>
                        {/* <LogButton /> */}
                    </Nav.Link>
                    <Nav.Link href="#features" className='cadastro'>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigateBar;