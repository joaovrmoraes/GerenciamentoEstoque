import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/index.jsx';

function render() {
    ReactDOM.render(<Home />, document.getElementById("root"));
}

render();