import axios from 'axios';
import React, { Component } from 'react'
import Cookies from 'js-cookie';

var csrfCookie = Cookies.get('csrftoken');

export class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            is_estudiante: false,
            is_profesor: false
        }
    }

    handleInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam]: val
        });
    }

    handleEstudiante = (event) => {
        this.setState({
            is_estudiante: true,
            is_profesor: false
        });
    }

    handleProfesor = (event) => {
        this.setState({
            is_estudiante: false,
            is_profesor: true
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.is_estudiante && !this.state.is_profesor){
            // console.log("Espera");
            return;
        }

        var bodyFormData = new FormData();

        bodyFormData.append('first_name', this.state.first_name);
        bodyFormData.append('last_name', this.state.last_name);
        bodyFormData.append('username', this.state.username);
        bodyFormData.append('password', this.state.password);
        bodyFormData.append('is_estudiante', this.state.is_estudiante);
        bodyFormData.append('is_profesor', this.state.is_profesor);

        axios.post('/api/registro/', bodyFormData, {
            headers: {
                'X-CSRFTOKEN': csrfCookie,
                'Content-Type': "multipart/form-data"
            }
        })
            .then(res => {
                // console.log(res);

                var loginFormData = new FormData();

                loginFormData.append('username', this.state.username);
                loginFormData.append('password', this.state.password);

                axios.post('/api-auth/login/?next=/inicio', loginFormData, {
                    headers: {
                        'X-CSRFTOKEN': csrfCookie,
                        'Content-Type': "multipart/form-data"
                    },
                })
                    .then(res => {
                        // console.log(res);
                        window.location.replace('/inicio');
                    })
                    .catch(res => {
                        console.log(res);
                    })
            });

    }

    render() {
        return (
            <div className="login-box" style={{ height: '590px', top: '65%'}}>
                <img src="/static/epy_mfe/logo1.png" className="App-logo" alt="logo" />
                <h1>Registro</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="first_name">Nombres</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Ingrese Nombres"
                        value={this.state.first_name}
                        onInput={this.handleInput}
                        required
                    />
                    <label htmlFor="last_name">Apellidos</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Ingrese Apellidos"
                        value={this.state.last_name}
                        onInput={this.handleInput}
                        required
                    />
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Ingrese Nombre de Usuario"
                        value={this.state.username}
                        onInput={this.handleInput}
                        required
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Ingrese Contraseña"
                        value={this.state.password}
                        onChange={this.handleInput}
                        required
                    />
                    <div className="row row-cols-2 g-2">
                        <button
                            className={`col btn btn-sm ${this.state.is_estudiante ? "btn-light" : "btn-outline-light"}`}
                            type="button"
                            name="is_estudiante"
                            value={this.state.is_estudiante}
                            onClick={this.handleEstudiante}
                        >
                            Soy estudiante
                        </button>
                        <button
                            className={`col btn btn-sm ${this.state.is_profesor ? "btn-light" : "btn-outline-light"}`}
                            type="button"
                            name="is_profesor"
                            value={this.state.is_profesor}
                            onClick={this.handleProfesor}
                        >
                            Soy profesor
                        </button>
                    </div>
                    <br />
                    <input type="submit" className="btn" value="Ingresar" />
                    <a href="/">¿Ya tienes una cuenta?</a>
                </form>
            </div>
        )
    }
}

export default Registro
