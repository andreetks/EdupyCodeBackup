import React, { Component } from 'react';
import axios from 'axios';
import Pregunta from './Preguntas/Pregunta';
import PreguntaNueva from './Preguntas/PreguntaNueva';

export class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preguntas: [],
            usuario: {
                id: null,
                username: ""
            }
        };
        this.obtenerUsuario();
    }

    obtenerUsuario() {
        axios.get('/api/obtener-usuario')
            .then(res => {
                this.setState({
                    usuario: res.data
                });
                this.redireccionLogin();
            })
    }

    redireccionLogin() {
        if (this.state.usuario.id === null & this.state.usuario.username === "") {
            window.location.replace('/');
        } else {
            this.obtenerPreguntas();
        }
    }

    obtenerPreguntas() {
        axios.get('/api/preguntas')
            .then(res => {
                this.setState({
                    preguntas: res.data
                });
            });
    }

    render() {
        return (
            <div className={this.state.usuario.id != null && this.state.usuario.username != "" ? "row m-0 vh-10 align-items-center justify-content-center" : "d-none"}>
                <div className="card bg-light col-10 mb-5 p-5 text-center" style={{ margin: '3%', borderRadius: '15px' }} >
                    <div className="cards">
                        <div className={this.state.usuario.is_estudiante ? "row col-12" : "d-none"}>
                            <PreguntaNueva />
                        </div>
                        {this.state.preguntas.map(pregunta => {
                            return (
                                <Pregunta
                                    key={pregunta.id}
                                    pregunta={pregunta}
                                    cardMode={false}
                                    marcable={this.state.usuario.is_profesor}
                                />
                            )
                        })}
                        {this.state.preguntas.length === 0 ? <div className="card-text text-secondary">No hay preguntas.</div> : ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default Inicio;
