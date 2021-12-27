import axios from "axios";
import React, { Component } from "react";
import Cookies from "js-cookie";

var csrfCookie = Cookies.get("csrftoken");

class Preguntas extends Component {
  removerPregunta = () => {
    axios
      .delete(`/api/preguntas/${this.props.id}/`, {
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
      <tr>
        <td>{this.props.id}</td>
        <td>{`${new Date(this.props.fecha).toLocaleDateString()} ${new Date(
          this.props.fecha
        ).toLocaleTimeString()}`}</td>
        <td>{this.props.titulo}</td>
        <td>{this.props.descripcion}</td>
        <td>{this.props.autor}</td>
        <td>
          {/* <a href="/" className="btn btn-success btn-circle btn-sm">
                        <i className="fas fa-eye"></i>
                    </a> */}
          <button
            title="Remover pregunta"
            className="btn btn-danger btn-circle btn-sm"
            onClick={this.removerPregunta}
          >
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
}

export class Dashpreguntas extends Component {
  render() {
    return (
      <div className="container-fluid">
        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Preguntas</h1>
        <p className="mb-4">
          En la siguiente tabla se presenta una lista de todas las preguntas y
          se da la opcion a eliminarlas si es necesario.
        </p>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6 className="m-2 font-weight-bold text-primary">Preguntas</h6>
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
                    <th>Publicada en</th>
                    <th>Título</th>
                    <th>Descripcion</th>
                    <th>Autor</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.preguntas.map((pregunta) => {
                    return (
                      <Preguntas
                        key={pregunta.id}
                        id={pregunta.id}
                        fecha={pregunta.fecha}
                        titulo={pregunta.titulo}
                        descripcion={pregunta.descripcion}
                        autor={pregunta.autor.username}
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

export default Dashpreguntas;
