import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

var csrfCookie = Cookies.get("csrftoken");

class ModalNuevoAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      is_estudiante: false,
      is_profesor: false,
      is_admin: true,
    };
  }

  cancelarRegistroAdmin = () => {
    window.location.reload();
  };

  handleInput = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/registro/", this.state, {
        headers: {
          "X-CSRFTOKEN": csrfCookie,
        },
      })
      .then((res) => {
        // console.log(res);
        window.location.reload();
      });
  };

  render() {
    return (
      <div>
        <div className="m-4">
          <h4 className="card-header">
            Registrar nuevo administrador{" "}
            <button
              onClick={this.cancelarRegistroAdmin}
              className="btn btn-outline"
            >
              <i className="fas fa-times"></i>
            </button>
          </h4>
          <div className="card-body">
            <h5 className="card-title">
              Ingresa los datos del nuevo administrador
            </h5>
            <form onSubmit={this.handleSubmit} className="form-group">
              <input
                name="first_name"
                value={this.state.first_name}
                type="text"
                placeholder="Ingrese nombres..."
                className="form-control my-2"
                onInput={this.handleInput}
              />
              <input
                name="last_name"
                value={this.state.last_name}
                type="text"
                placeholder="Ingrese apellidos..."
                className="form-control my-2"
                onInput={this.handleInput}
              />
              <input
                name="username"
                value={this.state.username}
                type="text"
                placeholder="Ingrese nombre de usuario..."
                className="form-control my-2"
                onInput={this.handleInput}
              />
              <input
                name="password"
                value={this.state.password}
                type="password"
                placeholder="Ingrese contraseña"
                className="form-control my-2"
                onInput={this.handleInput}
              />
              <button
                className="btn btn-success py-2"
                style={{ width: "100%" }}
              >
                Registrar administrador
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Usuario extends Component {
  render() {
    let tipo = "";

    if (this.props.is_estudiante) {
      tipo = "Estudiante";
    }

    if (this.props.is_profesor) {
      tipo = "Profesor";
    }

    if (this.props.is_admin) {
      tipo = "Administrador";
    }

    return (
      <tr>
        <td>{this.props.id}</td>
        <td>@{this.props.username}</td>
        <td>{`${this.props.first_name} ${this.props.last_name}`}</td>
        <td>{tipo}</td>
        <td>
          <a
            title="Restringir funcionalidad de pregunta"
            className="btn btn-secondary btn-circle btn-sm"
          >
            <i className="fas fa-question"></i>
          </a>
          <a
            title="Restringir función de chat"
            className="btn btn-primary btn-circle btn-sm"
          >
            <i className="fas fa-comment-slash"></i>
          </a>
          <a
            title="Restringir acceso temporalmente"
            className="btn btn-warning btn-circle btn-sm"
          >
            <i className="fas fa-user-lock"></i>
          </a>
          <a
            title="Restringir acceso permanentemente"
            className="btn btn-danger btn-circle btn-sm"
          >
            <i className="fas fa-user-slash"></i>
          </a>
          <a
            title="Liberar restricciones"
            className="btn btn-success btn-circle btn-sm"
          >
            <i className="fas fa-unlock-alt"></i>
          </a>
        </td>
      </tr>
    );
  }
}

export class Dashusuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onNuevoAdmin: false,
    };
  }
  nuevoAdmin = () => {
    this.setState({
      onNuevoAdmin: true,
    });
  };

  render() {
    let content;

    if (this.state.onNuevoAdmin) {
      content = <ModalNuevoAdmin />;
    } else {
      content = (
        <div className="container-fluid">
          {/* Page Heading */}
          <h1 className="h3 mb-2 text-gray-800">Usuarios</h1>
          <p className="mb-4">
            En la siguiente tabla se presenta una lista de todos los usuarios
            registrados y se da la opcion a visualizar los datos y aplicar
            restricciones si es necesario.
          </p>
          {/* DataTales Example */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <h6 className="m-2 font-weight-bold text-primary">
                    Usuarios
                  </h6>
                </div>
                <div className="col-sm-12 col-md-6 d-flex">
                  <div className="ml-auto">
                    <button
                      onClick={this.nuevoAdmin}
                      className="btn btn-success btn-icon-split"
                    >
                      <span className="icon text-white-50">
                        <i className="fas fa-plus"></i>
                      </span>
                      <span className="text">Nuevo admin</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing={0}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Nombre completo</th>
                      <th>Tipo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.usuarios.map((usuario) => {
                      return (
                        <Usuario
                          key={usuario.id}
                          id={usuario.id}
                          username={usuario.username}
                          first_name={usuario.first_name}
                          last_name={usuario.last_name}
                          is_estudiante={usuario.is_estudiante}
                          is_profesor={usuario.is_profesor}
                          is_admin={usuario.is_admin}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

export default Dashusuarios;
