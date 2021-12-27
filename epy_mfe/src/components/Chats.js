import React, { Component } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import PersonTarget from "./Chat/PersonTarget";

export class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sesiones: [],
      usuario: {},
    };
    this.obtenerUsuario();
    this.obtenerSesiones();
  }

  obtenerUsuario() {
    axios.get("/api/obtener-usuario/").then((res) => {
      this.setState({
        usuario: res.data,
      });
      //   console.log(this.state.usuario.id);
    });
  }

  obtenerDataUsuario(id) {
    axios.get(`/api/usuarios/${id}`).then((res) => {
      return res.data;
    });
  }

  obtenerSesiones() {
    axios.get("/api/crear-sesion/").then((res) => {
      let totalSesiones = [];
      totalSesiones = res.data;

      let filtro = totalSesiones.filter((s) => {
        return s.participantes.some((u) => u.id == this.state.usuario.id);
      });

      this.setState({
        sesiones: filtro,
      });
    });
  }

  render() {
    return (
      <div>
        {/* Content wrapper start */}
        <div className="content-wrapper my-4">
          {/* Row start */}
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <Toaster />
              <div className="card m-0">
                {/* Row start */}
                <div className="row no-gutters">
                  <div>
                    <div className="users-container">
                      <ul className="users mx-4">
                        {this.state.sesiones.map((sesion) => {
                          return (
                            <PersonTarget
                              key={sesion.id}
                              id={sesion.id}
                              name={sesion.asunto}
                              time={sesion.participantes
                                .map((p) => `${p.first_name} ${p.last_name}`)
                                .join(" y ")}
                              sessionKey={sesion.id_key}
                              img="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                              status="status busy"
                              nuevo={sesion.nuevo}
                              costo={sesion.participantes.reduce(
                                (a, b) => a + parseFloat(b["tarifa"]),
                                0
                              )}
                              isEstudiante={this.state.usuario.is_estudiante}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Row end */}
              </div>
            </div>
          </div>
          {/* Row end */}
        </div>
        {/* Content wrapper end */}
      </div>
    );
  }
}

export default Chats;
