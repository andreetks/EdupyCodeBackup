import React, { Component } from 'react';

class Usuario extends Component {
  
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.tipo}</td>
                <td>{this.props.fecha}</td>
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
};

export class Dashusuarios extends Component {

    render() {
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Usuarios</h1>
                <p className="mb-4">En la siguiente tabla se presenta una lista de todos los usuarios disponibles y se da la opcion a visualizar el perfil o eliminarlo.</p>
                {/* DataTales Example */}
                <div className="card shadow mb-4">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <h6 class="m-2 font-weight-bold text-primary">Usuarios</h6>
                            </div>
                            <div class="col-sm-12 col-md-6 d-flex">
                                <div class="ml-auto">
                                    <a href="productos.html" class="btn btn-success btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-plus"></i>
                                        </span>
                                        <span class="text">Nuevo Admin</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Tipo</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Usuario name="Usuario 1" fecha="10/06/2020" tipo="profesor" />
                                    <Usuario name="Usuario 2" fecha="10/06/2020" tipo="alumno" />
                                    <Usuario name="Usuario 3" fecha="10/05/2021" tipo="profesor" />
                                    <Usuario name="Usuario 4" fecha="10/08/2021" tipo="alumno" />
                                    <Usuario name="Usuario 5" fecha="10/05/2021" tipo="admin" />
                                    <Usuario name="Usuario 6" fecha="10/11/2021" tipo="profesor" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default Dashusuarios;