import axios from "axios";
import React, { Component } from "react";
import Cookies from "js-cookie";

var csrfCookie = Cookies.get("csrftoken");

export class ModalReporte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autor: null,
      categoria: "NONE",
      descripcion: "",

      enviado: false,
    };
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    axios.get("/api/obtener-usuario").then((res) => {
      this.setState({
        autor: res.data,
      });
    });
  }

  handleSelect = (event) => {
    this.setState({
      categoria: event.target.value,
    });
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

    console.log(this.state);

    axios
      .post(
        "/api/reportes/",
        {
          autor: this.state.autor.id,
          categoria: this.state.categoria,
          descripcion: this.state.descripcion,
        },
        {
          headers: {
            "X-CSRFTOKEN": csrfCookie,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        this.setState({
          enviado: true,
        });
      });
  };

  render() {
    let componentRender;
    if (this.state.enviado) {
      componentRender = (
        <div className="card-body">
          <h5 className="card-title">Tu reporte se ha enviado.</h5>
          <p className="card-text text-muted">Gracias por tu apoyo.</p>
        </div>
      );
    } else {
      componentRender = (
        <div className="card-body">
          <h5 className="card-title">
            Lamentamos lo sucedido. Por favor, dinos qué pasó.
          </h5>
          <form onSubmit={this.handleSubmit}>
            <p className="card-text">
              Selecciona una categoría para el reporte
            </p>
            <select
              className="form-control"
              required
              value={this.state.categoria}
              onChange={this.handleSelect}
            >
              <option value="NONE" disabled>
                Seleccionar categoría...
              </option>
              <option value="BUG">Ocurrió un error</option>
              <option value="ABUSE">Quiero reportar un abuso</option>
              <option value="QUALITY">Insatisfacción con el servicio</option>
              <option value="OTHER">Otro motivo</option>
            </select>
            <p className="card-text mt-4">¿Qué fue lo que sucedió?</p>
            <input
              type="text"
              name="descripcion"
              value={this.state.descripcion}
              onInput={this.handleInput}
              placeholder="Describe lo que ocurrió..."
              className="form-control"
            />
            <p className="text-muted card-text mt-4">
              Todos los reportes serán revisados por el equipo de administración
              antes de efectuar alguna acción.
            </p>
            <button className="btn btn-danger btn--block">
              Enviar reporte
            </button>
          </form>
        </div>
      );
    }

    return (
      <div
        className="position-relative"
        style={{ width: "90vw", height: "90vh" }}
      >
        <div className="card position-absolute top-50 start-50 translate-middle">
          <h4 className="card-header">Enviar un reporte</h4>
          {componentRender}
        </div>
      </div>
    );
  }
}

export default ModalReporte;
