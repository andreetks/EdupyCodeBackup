import React, { Component } from 'react'

export class CardUsuario extends Component {
    render() {
        const { usuario } = this.props;

        let tipoUsuario = "";
        let tarifa = "";

        if (usuario.is_estudiante) {
            tipoUsuario = "Estudiante";
            tarifa = "";
        } else if (usuario.is_profesor) {
            tipoUsuario = "Profesor";
            tarifa = (
                <p className="card__text text-muted">S/. {usuario.tarifa}</p>
            )
        }

        return (
            <div className="cards__item">
                <div className="cardPregunta">
                    <div className="card__content">
                        <h2 className="card__title">{tipoUsuario}</h2>
                        <p className="card__text">{`${usuario.first_name} ${usuario.last_name}`}</p>
                        <a className="card__text text-primary">@{usuario.username}</a>
                        <p className="card__text text-muted">Valoración: {Math.round(usuario.valoracion * 100)/100}/10</p>
                        {tarifa}
                    </div>
                </div>
            </div>
        )
    }
}

export default CardUsuario;