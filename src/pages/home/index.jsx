import * as React from 'react';
import './index.css'
import NavigateBar from '../../components/navbar/navbar.js';
import TabelaEstoque from '../../components/table/table.js';

function Home() {
    return (
        <>
            <NavigateBar />
            <div className='tabelaPC'>
                <TabelaEstoque />
            </div>
        </>
    )
}

export default Home