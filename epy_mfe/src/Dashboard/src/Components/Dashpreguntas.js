import React, { Component } from 'react';

class Preguntas extends Component{

    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.estado}</td>
                <td>{this.props.fecha}</td>
                <td>Esta es una breve descripcion de la pregunta.</td>
                <td>
                    <a href="/" class="btn btn-success btn-circle btn-sm">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="/" class="btn btn-danger btn-circle btn-sm">
                        <i class="fas fa-trash"></i>
                    </a>
                </td>
            </tr>
        )
    }
}

export class Dashpreguntas extends Component {
    render() {
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Preguntas</h1>
                <p className="mb-4">En la siguiente tabla se presenta una lista de todos los reportes y se da la opcion a visualizar el reporte o eliminarlo.</p>
                {/* DataTales Example */}
                <div className="card shadow mb-4">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <h6 class="m-2 font-weight-bold text-primary">Preguntas</h6>
                            </div>
                        </div>

                    </div>

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                        <th>Descripcion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Preguntas id="001" fecha="10/06/2020" estado="En espera" />
                                    <Preguntas id="002" fecha="10/06/2020" estado="Cerrado" />
                                    <Preguntas id="003" fecha="10/05/2021" estado="En espera" />
                                    <Preguntas id="004" fecha="10/08/2021" estado="En sesion..." />
                                    <Preguntas id="005" fecha="10/05/2021" estado="En espera" />
                                    <Preguntas id="006" fecha="10/11/2021" estado="Cerrado" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default Dashpreguntas;