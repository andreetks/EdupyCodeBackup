import React, { Component } from 'react'
import axios from 'axios';

import Pregunta from './Preguntas/Pregunta';
import CardUsuario from './CardUsuario';

export class Busqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            origUsuarios: [],
            preguntas: [],
            origPreguntas: [],
            query: "",
        };
        this.obtenerUsuarios();
        this.obtenerPreguntas();
    }

    obtenerUsuarios() {
        axios.get('/api/estudiantes')
            .then(res => {
                this.setState({
                    origUsuarios: res.data
                });

                let estArr = this.state.origUsuarios;
                estArr.map(u => {
                    u.usuario.is_estudiante = true;
                    u.usuario.is_profesor = false;
                })
                
                axios.get('/api/profesores')
                    .then(res => {
                        this.setState({
                            origUsuarios: res.data
                        });

                        let profArr = this.state.origUsuarios;
                        profArr.map(u => {
                            u.usuario.is_estudiante = false;
                            u.usuario.is_profesor = true;
                        })

                        this.setState({
                            origUsuarios: estArr.concat(profArr),
                            usuarios: estArr.concat(profArr),
                        })
                    })
            })
    }

    obtenerPreguntas() {
        axios.get('/api/preguntas')
            .then(res => {
                this.setState({
                    origPreguntas: res.data,
                    preguntas: res.data
                });
            });
    }

    buscar = (event) => {
        this.setState({
            query: event.target.value
        });

        const oldUsers = this.state.origUsuarios;
        const oldPregs = this.state.origPreguntas;

        this.setState({
            usuarios: oldUsers.filter(user => {
                return user.usuario.username.toLowerCase().includes(this.state.query.toLowerCase())
            }),
            preguntas: oldPregs.filter(preg => {
                return preg.titulo.toLowerCase().includes(this.state.query.toLowerCase())
            })
        });
    }

    render() {
        return (
            <div className="m-5">
                {/* Search bar */}
                <div className="input-group mb-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar..."
                        value={this.state.query}
                        onInput={this.buscar}
                    />
                </div>

                {/* Users */}
                <div className="card bg-light p-5" style={{ borderRadius: '15px' }}>
                    <h2 className="card__title">Usuarios con {`"${this.state.query}"`}</h2>
                    <div className="row row-cols-3 g-5">
                        {this.state.usuarios.map(usuario => {
                            return (
                                <CardUsuario
                                    key={usuario.usuario.id}
                                    usuario={usuario.usuario}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Preguntas */}
                <div className="card bg-light p-5" style={{ borderRadius: '15px' }}>
                    <h2 className="card__title">Preguntas con {`"${this.state.query}"`}</h2>
                    <div className="row row-cols-3 g-5">
                        {this.state.preguntas.map(pregunta => {
                            return (
                                <Pregunta
                                    key={pregunta.id}
                                    pregunta={pregunta}
                                    cardMode={true}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Busqueda;
