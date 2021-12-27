import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashnavbar from './Dashnavbar';
import Dashtopbar from './Dashtopbar';

import Dashinicio from './Dashinicio';
import Dashpreguntas from './Dashpreguntas';
import Dashreportes from './Dashreportes';
import Dashsesiones from './Dashsesiones';
import Dashusuarios from './Dashusuarios';
import axios from 'axios';

export class DashView extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuario: {},

            usuarios: [],
            preguntas: [],
            sesiones: [],
            reportes: []
        };
        this.obtenerUsuario();
        this.obtenerUsuarios();
        this.obtenerPreguntas();
        this.obtenerSesiones();
        this.obtenerReportes();
    }

    obtenerUsuario(){
        axios.get('/api/obtener-usuario')
            .then(res => {
                this.setState({
                    usuario: res.data
                });

                if(!this.state.usuario.is_admin){
                    window.location.replace('/');
                }
            })
    }

    obtenerUsuarios(){
        axios.get('/api/usuarios')
            .then(res => {
                this.setState({
                    usuarios: res.data
                });
            })
    }

    obtenerPreguntas(){
        axios.get('/api/preguntas')
        .then(res => {
            this.setState({
                preguntas: res.data
            });
        })
    }

    obtenerSesiones(){
        axios.get('/api/crear-sesion')
        .then(res => {
            this.setState({
                sesiones: res.data
            });
        })
    }

    obtenerReportes(){
        axios.get('/api/reportes')
        .then(res => {
            this.setState({
                reportes: res.data
            });
        })
    }

    render() {
        return (
            <div id="wrapper">
                <Dashnavbar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Dashtopbar usuario={this.state.usuario} />
                        <Router>
                            <Switch>
                                <Route exact path='/administracion/'>
                                    <Dashinicio
                                        usuarios={this.state.usuarios}
                                        preguntas={this.state.preguntas}
                                        reportes={this.state.reportes}
                                        sesiones={this.state.sesiones}
                                    />
                                </Route>
                                <Route path='/administracion/usuarios'>
                                    <Dashusuarios
                                        usuarios={this.state.usuarios}
                                    />
                                </Route>
                                <Route path='/administracion/preguntas'>
                                    <Dashpreguntas
                                        preguntas={this.state.preguntas}
                                    />
                                </Route>
                                <Route path='/administracion/reportes' component={Dashreportes} />
                                <Route path='/administracion/sesiones' component={Dashsesiones} />
                            </Switch>
                        </Router>
                    </div>
                    <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright © Trash Consult 2021. Todos los derechos reservados.</span>
                        </div>
                    </div>
                </footer>
                </div>
            </div>
        )
    }
}

export default DashView;

ReactDOM.render(<DashView />, document.getElementById('admin-app'))
