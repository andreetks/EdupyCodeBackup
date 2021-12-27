import axios from "axios";
import React, { Component } from "react";
import Cookies from "js-cookie";

var csrfCookie = Cookies.get("csrftoken");

class Sesiones extends Component {
  terminarSesion = () => {
    axios
      .patch(
        `/api/crear-sesion/${this.props.id}/`,
        {
          terminada: true,
          nuevo: false,
        },
        {
          headers: {
            "X-CSRFTOKEN": csrfCookie,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        window.location.reload();
      });
  };

  render() {
    let estado;

    if (this.props.nuevo) {
      estado = "En espera";
    }

    if (this.props.terminada) {
      estado = "Terminada";
    }

    if (!this.props.nuevo && !this.props.terminada) {
      estado = "Activa";
    }
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.id_key}</td>
        <td>{this.props.asunto}</td>
        <td>{estado}</td>
        <td>
          <a
            href={`/chat/${this.props.id_key}`}
            target="_blank"
            title="Monitorear sesión"
            className="btn btn-success btn-circle btn-sm"
          >
            <i className="fas fa-eye"></i>
          </a>
          <button
            title={
              this.props.terminada ? "Sesión ya finalizó" : "Terminar sesión"
            }
            disabled={this.props.terminada}
            onClick={this.terminarSesion}
            className="btn btn-danger btn-circle btn-sm"
          >
            <i className="fas fa-stop"></i>
          </button>
        </td>
      </tr>
    );
  }
}

export class Dashsesiones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sesiones: [],
    };
    this.obtenerSesiones();
  }

  obtenerSesiones() {
    axios.get("/api/crear-sesion").then((res) => {
      this.setState({
        sesiones: res.data,
      });
      //   console.log(res);
    });
  }

  render() {
    return (
      <div className="container-fluid">
        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Sesiones</h1>
        <p className="mb-4">
          En la siguiente tabla se presenta una lista de todas las sesiones
          activas o cerradas.
        </p>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6 className="m-2 font-weight-bold text-primary">Sesiones</h6>
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
                    <th>Clave</th>
                    <th>Asunto</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.sesiones.map((sesion) => {
                    return (
                      <Sesiones
                        key={sesion.id}
                        id={sesion.id}
                        id_key={sesion.id_key}
                        asunto={sesion.asunto}
                        nuevo={sesion.nuevo}
                        terminada={sesion.terminada}
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
}

export default Dashsesiones;
