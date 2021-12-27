import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

var csrfCookie = Cookies.get("csrftoken");

export class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: "",
      first_name: "",
      last_name: "",
      is_estudiante: false,
      is_profesor: false,
      tarifa: "0.00",
      valoracion: 0,

      foto: "",

      editando: false,
      editandoFoto: false,
    };
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    axios.get("/api/obtener-usuario").then((res) => {
      this.setState({
        id: res.data.id,
        username: res.data.username,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        is_estudiante: res.data.is_estudiante,
        is_profesor: res.data.is_profesor,
        url_foto: res.data.url_foto,
      });
      this.redireccionLogin();

      axios.get(`/api/editar-usuario/${res.data.id}`).then((res) => {
        this.setState({
          tarifa: res.data.tarifa,
          valoracion: res.data.valoracion,
        });
      });
    });
  }

  redireccionLogin() {
    if (this.state.id === null && this.state.username === "") {
      window.location.replace("/");
    }
  }

  toggleEditando = () => {
    if (this.state.editando) {
      this.setState({
        editando: false,
      });
      this.obtenerDatosUsuario();
    } else {
      this.setState({
        editando: true,
      });
    }
    // console.log(this.state);
  };

  toggleFoto = () => {
    if (this.state.editandoFoto) {
      this.setState({ editandoFoto: false });
    } else {
      this.setState({ editandoFoto: true });
    }
  };

  subirFoto = () => {
    if(this.state.foto === ""){
      return
    }
    const imageData = new FormData();

    imageData.append("file", this.state.foto);
    imageData.append("upload_preset", "xxfnfjn1");
    imageData.append("cloud_name", "dyzt1qzeb");

    axios.post("https://api.cloudinary.com/v1_1/dyzt1qzeb/image/upload", imageData)
    .then(res => {
      // console.log(res);
      const urlImagen = res.data.url;
      
      axios.patch(`/api/editar-usuario/${this.state.id}`, {
        "url_foto" : urlImagen
      }, {
        headers: {
          "X-CSRFTOKEN": csrfCookie,
        }
      }).then(resp => {
        // console.log(resp);
        this.setState({
          foto: ""
        });
        window.location.reload();
      })
    })
  }

  handleInput = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
    });
  };

  handleSubmit = (event) => {
    let profileHeaders = {
      "X-CSRFTOKEN": csrfCookie,
      "Content-Type": "application/json",
    };

    let userData = {
      // id: this.state.id,
      // username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      tarifa: this.state.tarifa,
    };

    axios
      .patch(`/api/editar-usuario/${this.state.id}`, userData, {
        headers: profileHeaders,
      })
      .then((res) => {
        // console.log(res);
        this.setState({ editando: false });
        this.obtenerDatosUsuario();
      });
  };

  render() {
    let tarifaServicio = "";
    let inputFoto = "";

    if (this.state.is_profesor) {
      tarifaServicio = (
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Tarifa de servicio</h6>
          </div>

          <div className="col-sm-9 text-secondary">
            <div className={this.state.editando ? "d-none" : ""}>
              S/. {this.state.tarifa}
            </div>
            <input
              className={this.state.editando ? "form-control" : "d-none"}
              type="number"
              step="0.01"
              name="tarifa"
              value={this.state.tarifa}
              onInput={this.handleInput}
            />
          </div>
        </div>
      );
    }

    if (this.state.editandoFoto) {
      inputFoto = (
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={(e) => this.setState({ foto: e.target.files[0] })}
          />
          <button onClick={this.subirFoto} className="btn btn-success btn-sm">Guardar nueva foto</button>
        </div>
      );
    }

    return (
      <div className="vh-100 align-items-center">
        <div className="" style={{ marginTop: "3%" }}>
          {/*<!--TARJETA DEL LADO IZQUIERDO CON LA IMAGEN-->*/}
          <div className="card ">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={this.state.url_foto}
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />

                {/* Editar foto de perfil */}
                <button
                  onClick={this.toggleFoto}
                  className={`btn btn-sm ${
                    this.state.editandoFoto ? "btn-danger" : "btn-primary"
                  }`}
                >
                  {this.state.editandoFoto ? "Cancelar" : "Cambiar foto"}
                </button>
                {inputFoto}

                <div className="mt-3">
                  <h4>{`${this.state.first_name} ${this.state.last_name}`}</h4>
                  <p className="text-secondary mb-1">
                    {this.state.is_estudiante ? "Estudiante" : ""}
                  </p>
                  <p className="text-secondary mb-1">
                    {this.state.is_profesor ? "Profesor" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {/*<!--TARJETA CON LOS DATOS NOMBRE, CORREO,ETC-->*/}
          <div className="card mb-3">
            <div className="card-body">
              {/* NOMBRES */}
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Nombres</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <div className={this.state.editando ? "d-none" : ""}>
                    {`${this.state.first_name}`}
                  </div>
                  <input
                    className={this.state.editando ? "form-control" : "d-none"}
                    type="text"
                    name="first_name"
                    value={this.state.first_name}
                    onInput={this.handleInput}
                  />
                </div>
              </div>
              <hr />

              {/* APELLIDOS */}
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Apellidos</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <div className={this.state.editando ? "d-none" : ""}>
                    {`${this.state.last_name}`}
                  </div>
                  <input
                    className={this.state.editando ? "form-control" : "d-none"}
                    type="text"
                    name="last_name"
                    value={this.state.last_name}
                    // placeholder={this.state.last_name}
                    onInput={this.handleInput}
                    // onChange={this.handleInput}
                  />
                </div>
              </div>
              <hr />

              {/*<!--NOMBRE DE USUARIO-->*/}
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Nombre de usuario</h6>
                </div>

                <div className="col-sm-9 text-secondary">
                  <a className="text-primary">@{this.state.username}</a>
                  {/* <input
                                        className={this.state.editando ? "form-control" : "d-none"}
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        // placeholder={this.state.username}
                                        onInput={this.handleInput}
                                    // onChange={this.handleInput}
                                    /> */}
                </div>
              </div>

              <hr />

              {/*<!--VALORACION-->*/}
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Valoración</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {this.state.valoracion} / 10 <i className="fas fa-star"></i>
                </div>
              </div>

              <hr />

              {/*<!-- TARIFA: PROFESOR -->*/}
              {tarifaServicio}

              <hr className={this.state.is_profesor ? "" : "d-none"} />

              {/* <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-globe mr-2 icon-inline"
                                        ><circle cx="12" cy="12" r="10"></circle><line
                                            x1="2"
                                            y1="12"
                                            x2="22"
                                            y2="12"
                                        ></line><path
                                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                                        ></path>
                                        </svg>&nbsp;&nbsp;Website
                                    </h6>
                                </div>
                                <div className="col-sm-9 text-secondary">

                                    https://www.edupy.com

                                </div>
                            </div> */}

              {/* <hr />
                            <div className="row" >
                                <div className="col-sm-3">
                                    <h6 className="mb-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-github mr-2 icon-inline"
                                        ><path
                                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                        ></path>
                                        </svg>&nbsp;&nbsp;Github
                                    </h6>
                                </div>

                                <div className="col-sm-9 text-secondary">

                                    EDUPY

                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-twitter mr-2 icon-inline text-info"
                                        ><path
                                            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                                        ></path>
                                        </svg>&nbsp;&nbsp;Twitter
                                    </h6>
                                </div>

                                <div className="col-sm-9 text-secondary">

                                    @EDUPY


                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-instagram mr-2 icon-inline text-danger"
                                        ><rect
                                            x="2"
                                            y="2"
                                            width="20"
                                            height="20"
                                            rx="5"
                                            ry="5"
                                        ></rect><path
                                            d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                                        ></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>&nbsp;&nbsp;Instagram
                                    </h6>
                                </div>
                                <div className=" col-sm-9 text-secondary">
                                    EDUPY
                                </div>
                            </div>
                            <hr />
                            <div className="row" >
                                <div className="col-sm-3">
                                    <h6 className="mb-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-facebook mr-2 icon-inline text-primary"
                                        ><path
                                            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                                        ></path>
                                        </svg>&nbsp;&nbsp;Facebook
                                    </h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    EDUPY
                                </div>
                            </div>
                            <hr /> */}

              <div className={this.state.editando ? "d-none" : "row"}>
                <div className="col-sm-12">
                  <button
                    className="btn btn-info"
                    onClick={this.toggleEditando}
                  >
                    Editar
                  </button>
                </div>
              </div>
              <div className={this.state.editando ? "row" : "d-none"}>
                <div className="col-sm-4 text-secondary">
                  <button
                    className="btn btn-primary px-4"
                    onClick={this.handleSubmit}
                  >
                    Confirmar
                  </button>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 text-secondary">
                  <button
                    className="btn btn-danger px-4"
                    onClick={this.toggleEditando}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
