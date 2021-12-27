import React, { Component } from "react";
import axios from "axios";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioLogueado: false,
      usuario: {
        id: null,
        first_name: "",
        last_name: "",
        username: "",
        is_estudiante: false,
        is_profesor: false,
      },
    };
    this.obtenerUsuarioActual();
  }

  obtenerUsuarioActual() {
    axios.get("/api/obtener-usuario").then((res) => {
      if (res.data.id == null && res.data.username == "") {
        this.setState({
          usuarioLogueado: false,
        });
      } else {
        this.setState({
          usuarioLogueado: true,
          usuario: res.data,
        });
      }
    });
  }

  render() {
    let navbarOptions;
    let dropdownOptions;

    if (this.state.usuarioLogueado) {
      dropdownOptions = (
        <div className="dropdown-menu">
          {this.state.usuario.is_admin ? (
            <a className="dropdown-item" href="/administracion">
              Dashboard
            </a>
          ) : (
            <a className="dropdown-item" href="/perfil">
              Perfil
            </a>
          )}
          <a className="dropdown-item" href="/ayuda">
            Ayuda
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="/api-auth/logout/?next=/">
            Cerrar Sesion
          </a>
        </div>
      );
      navbarOptions = (
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="/inicio">
              Inicio
            </a>
          </li>
          {/* <li className="nav-item">
                        <a className="nav-link" href="/mis-preguntas">Mis Preguntas</a>
                    </li> */}
          <li className="nav-item">
            <a className="nav-link" href="/busqueda">
              Búsqueda
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/chats">
              Chat
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/sobre-nosotros">
              Sobre Nosotros
            </a>
          </li>
        </ul>
      );
    } else {
      dropdownOptions = (
        <div className="dropdown-menu">
          <a className="dropdown-item" href="/ayuda">
            Ayuda
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="/">
            Iniciar Sesion
          </a>
          <a className="dropdown-item" href="/registro">
            Regístrate
          </a>
        </div>
      );
      navbarOptions = (
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="/sobre-nosotros">
              Sobre Nosotros
            </a>
          </li>
        </ul>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          <a className="navbar-brand" href="/">
            EDUPY
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            {navbarOptions}
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="/#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.usuarioLogueado
                  ? this.state.usuario.username
                  : "Opciones"}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
              {dropdownOptions}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
