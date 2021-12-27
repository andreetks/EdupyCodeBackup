import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

var csrfCookie = Cookies.get('csrftoken');

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
                this.redireccionInicio();
            })
    }

    redireccionInicio() {
        if (this.state.usuario.id != null && this.state.usuario.username != "") {
            window.location.replace('/inicio');
        }
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

        var bodyFormData = new FormData();

        bodyFormData.append('username', this.state.username);
        bodyFormData.append('password', this.state.password);

        axios.post('/api-auth/login/?next=/inicio', bodyFormData, {
            headers: {
                'X-CSRFTOKEN': csrfCookie,
                'Content-Type': "multipart/form-data"
            },
        })
            .then(res => {
                if (res.status > 400) {
                    console.log(res);
                } else {
                    axios.get('/api/obtener-usuario')
                        .then(res => {
                            if (res.data.id == null && res.data.username == "") {
                                window.location.replace('/');
                            }
                            else {
                                window.location.replace('/inicio');
                            }
                        })
                    // console.log(res.data);
                }
            })
            .catch(res => {
                console.log(res);
            });

    }

    render() {
        return (
            <div className="login-box">
                <img src="/static/epy_mfe/logo1.png" className="App-logo" alt="logo" />
                <h1>Iniciar sesión</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* USERNAME INPUT */}
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Ingrese Nombre de Usuario"
                        value={this.state.username}
                        onInput={this.handleInput}
                        required
                    />
                    {/* PASSWORD INPUT */}
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Ingrese Contraseña"
                        value={this.state.password}
                        onChange={this.handleInput}
                        required
                    />
                    <input type="submit" className="btn" value="Ingresar" />
                    <a href="/registro">¿No tienes una cuenta?</a>
                </form>
            </div>
        )
    }
}

export default Login;
