import React, { Component } from 'react';


export class Dashnavbar extends Component {

    render() {
        return (
            <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                    </div>
                    <div className="sidebar-brand-text mx-3">TRASH CONSULT</div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item active">
                    <a className="nav-link" href="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span></a>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">
                    Interface
                </div>
                {/* Nav Item - Usuarios */}
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard/usuarios">
                        <i className="fas fa-fw fa-user" />
                        <span>Usuarios</span></a>
                </li>
                {/* Nav Item - Preguntas */}
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard/preguntas">
                        <i className="fas fa-fw fa-question" />
                        <span>Preguntas</span></a>
                </li>
                {/* Nav Item - Sesiones */}
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard/sesiones">
                        <i className="fas fa-fw fa-comments-dollar" />
                        <span>Sesiones</span></a>
                </li>
                {/* Nav Item - Reportes */}
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard/reportes">
                        <i className="fas fa-fw fa-bug" />
                        <span>Reportes</span></a>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <a href="/" class="btn btn-secondary btn-circle">
                        <i class="fas fa-fw fa-sign-out-alt"/>
                    </a>
                </div>

            </ul>

        )
    }
}

export default Dashnavbar;
