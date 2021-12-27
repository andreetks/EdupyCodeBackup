import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react'

var csrfCookie = Cookies.get('csrftoken')

export class PreguntaNueva extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            descripcion: ''
        };
    }

    handleInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam]: val
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/preguntas/', this.state, {
            headers: {
                'X-CSRFTOKEN': csrfCookie,
            }
        })
            .then(res => {
                this.setState({
                    titulo: "",
                    descripcion: ""
                });
                window.location.reload();
            });
    }

    render() {
        return (
            <li className="cards__item row col-12">
                <div className="cardPregunta ">
                    <div className="card__content">
                        <div className="card__title pb-2">Nueva pregunta</div>
                        <form className="card__text" onSubmit={this.handleSubmit}>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="titulo"
                                placeholder="Título de la pregunta"
                                value={this.state.titulo}
                                onInput={this.handleInput}
                            />
                            <textarea
                                className="form-control"
                                type="text"
                                name="descripcion"
                                placeholder="Descripción de la pregunta"
                                value={this.state.descripcion}
                                onInput={this.handleInput}
                            />
                            <br />
                            <button
                                type="submit"
                                className="btn btn--block btn-primary"
                            >
                                Publicar
                            </button>
                        </form>
                    </div>
                </div>
                <hr className="mt-5"/>
            </li>
        )
    }
}

export default PreguntaNueva;
