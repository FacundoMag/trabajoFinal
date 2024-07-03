import React, { Component } from "react";
import axios from "axios";
import './Registro.css';

export default class Registro extends Component {
  state = {
    user: "",
    pass: "",
    nombres: "",
    apellidos: "",
    documento: "",
  };

  manejarCambio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  manejarRegistro = async () => {
    try {
      const response = await axios.post("https://personas.ctpoba.edu.ar/api/registrar", this.state);
      this.props.manejarLogin(response.data.user, response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Registro</h2>
        <input name="user" placeholder="Usuario" onChange={this.manejarCambio} />
        <input name="pass" placeholder="Contraseña" onChange={this.manejarCambio} type="password" />
        <input name="nombres" placeholder="Nombres" onChange={this.manejarCambio} />
        <input name="apellidos" placeholder="Apellidos" onChange={this.manejarCambio} />
        <input name="documento" placeholder="Documento" onChange={this.manejarCambio} />
        <button onClick={this.manejarRegistro}>Registrarse</button>
      </div>
    );
  }
}
