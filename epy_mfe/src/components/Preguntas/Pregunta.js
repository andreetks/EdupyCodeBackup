import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

var csrfCookie = Cookies.get('csrftoken')


export class Pregunta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                id: null,
                username: "",
            },
            marcada: false,
        };
        this.obtenerUsuario();
    }

    obtenerUsuario(){
        axios.get('api/obtener-usuario/')
            .then(res => {
                this.setState({
                    usuario: res.data
                });
            })
    }

    handleMarcar = (event) => {
        if(this.state.marcada){
            return;
        }

        let arr = new Uint8Array(length=16)
        window.crypto.getRandomValues(arr);
        let sesion = arr.join('').slice(0,16);

        let userArr = [];

        userArr.push(this.props.pregunta.autor.id);
        userArr.push(this.state.usuario.id);

        axios.post('api/crear-sesion/', {
            'id_key': sesion,
            'asunto': this.props.pregunta.titulo,
            'participantes': userArr
        },
        {
            headers: {
                'X-CSRFTOKEN': csrfCookie,
            }
        })
            .then(res => {
                // console.log(res);
                // console.log("Sesion creada!");
                // console.log("ID:", sesion);
                this.setState({
                    marcada: true,
                })
            })
    }

    render() {
        const { pregunta } = this.props;
        return (
            <li className={this.props.cardMode ? "cards__item" : "cards__item row col-12"}>
                <div className="cardPregunta ">
                    <div className="card__content">
                        <div className="card__title">{pregunta.titulo} {pregunta.editada ? "(editada)" : ""}</div>
                        <p className="card__text">{pregunta.descripcion}</p>
                        <p className="card__text text-muted">
                            Publicada el {new Date(pregunta.fecha).toLocaleDateString()} a
                            las {new Date(pregunta.fecha).toLocaleTimeString()} por {pregunta.autor.username}.
                        </p>
                        {
                            this.props.marcable ?
                            <button
                                className="btnPregunta btn--block card__btn"
                                onClick={this.handleMarcar}
                            >{!this.state.marcada ? "Marcar pregunta" : "(Ya has marcado esta pregunta)"}</button>
                            :
                            ""
                        }
                    </div>
                </div>
            </li>
        )
    }
}

export default Pregunta;
