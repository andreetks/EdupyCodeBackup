import axios from "axios";
import React, { Component } from "react";
import Cookies from "js-cookie";

var csrfCookie = Cookies.get("csrftoken");

export class ModalValoracion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			autor: null,
			categoria: "QUALITY",
			stars: 1,
			descripcion: "",
		};
	}

	enviarValoracion = (event) => {
		event.preventDefault();

		axios.get(`/api/editar-usuario/${this.props.peer.id}`).then((res) => {
			let valoracionOrig = res.data.valoracion;
			console.log(valoracionOrig);
			console.log(this.state.stars);

			axios
				.patch(
					`/api/editar-usuario/${this.props.peer.id}`,
					{
						valoracion:
							(parseFloat(valoracionOrig) +
								parseFloat(this.state.stars)) /
							2,
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
		});
	};

	handleInput = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({
			[nam]: val,
		});
	};

	render() {
		return (
			<div
				className="position-relative"
				style={{ height: "90vh", width: "90vw" }}
			>
				<div className="card position-absolute top-50 start-50 translate-middle">
					<h4 className="card-header">
						¡Sesión terminada con éxito!
					</h4>
					<div className="card-body">
						<h5 className="card-title">
							Cuéntanos cómo estuvo tu sesión
						</h5>
						<form
							className="form-group"
							onSubmit={this.enviarValoracion}
						>
							<input
								type="number"
								placeholder="Valoracion 1-10"
								value={this.state.stars}
								onChange={this.handleInput}
								name="stars"
								className="form-control"
							/>
							<br />
							<input
								type="text"
								value={this.state.descripcion}
								onChange={this.handleInput}
								name="descripcion"
								placeholder="Describe brevemente tu experiencia..."
								className="form-control"
							/>
							<br />
							<a
								href="/reporte"
								target="_blank"
								className="col btn btn-link text-danger"
							>
								Reportar...
							</a>
							<button
								type="submit"
								className="btn btn-primary btn--block"
							>
								Enviar
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ModalValoracion;
