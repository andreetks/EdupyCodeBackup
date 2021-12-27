import React, { Component } from "react";
import axios from "axios";

class Reportes extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.categoria}</td>
        <td>{`${new Date(
          this.props.fecha_envio
        ).toLocaleDateString()} ${new Date(
          this.props.fecha_envio
        ).toLocaleTimeString()}`}</td>
        <td>{this.props.descripcion}</td>
        <td>
          <button
            title="Marcar como aprobado"
            className="btn btn-success btn-circle btn-sm"
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            title="Marcar como rechazado"
            className="btn btn-danger btn-circle btn-sm"
          >
            <i className="fas fa-times"></i>
          </button>
        </td>
      </tr>
    );
  }
}

export class Dashreportes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportes: [],
    };
    this.obtenerReportes();
  }

  obtenerReportes() {
    axios.get("/api/reportes").then((res) => {
      this.setState({
        reportes: res.data,
      });
      //   console.log(res.data);
    });
  }

  render() {
    return (
      <div className="container-fluid">
        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Reportes</h1>
        <p className="mb-4">
          En la siguiente tabla se presenta una lista de todos los reportes para
          marcarlos como aprobados o rechazarlos.
        </p>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6 className="m-2 font-weight-bold text-primary">Reportes</h6>
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
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.reportes.map((reporte) => {
                    return (
                      <Reportes
                        key={reporte.id}
                        id={reporte.id}
                        fecha_envio={reporte.fecha_envio}
                        categoria={reporte.categoria}
                        descripcion={reporte.descripcion}
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

export default Dashreportes;
