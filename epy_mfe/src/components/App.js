import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import NavBar from './NavBar';
import Registro from './Auth/Registro';
import Login from './Auth/Login';
import Perfil from './Perfil';
import Inicio from './Inicio';
import SobreNosotros from './SobreNosotros';
import Ayuda from './Ayuda';
import Chats from './Chats';
import ChatRoom from './ChatRoom';
import Busqueda from './Busqueda';
import ModalReporte from './Valoracion/ModalReporte';


export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/registro' component={Registro} />
                    <Route path='/perfil' component={Perfil} />
                    <Route path='/inicio' component={Inicio} />
                    <Route path='/sobre-nosotros' component={SobreNosotros} />
                    <Route path='/ayuda' component={Ayuda} />
                    <Route path='/chats' component={Chats} />
                    <Route path='/chat/:id_key' exact component={ChatRoom} />
                    <Route path='/busqueda' component={Busqueda} />
                    <Route path='/reporte' component={ModalReporte} />
                </Switch>
            </Router>
        )
    }
}

export default App;

ReactDOM.render(<NavBar />, document.getElementById('barra-navegacion'));
ReactDOM.render(<App />, document.getElementById('app'));