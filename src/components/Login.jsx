import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    user: "",
    pass: "",
  };

  manejarCambio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  manejarLogin = async () => {
    try {
      const response = await axios.post("https://personas.ctpoba.edu.ar/api/ingresar", this.state);
      this.props.manejarLogin(response.data.user, response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input name="user" placeholder="Usuario" onChange={this.manejarCambio} />
        <input name="pass" placeholder="Contraseña" onChange={this.manejarCambio} type="password" />
        <button onClick={this.manejarLogin}>Iniciar Sesión</button>
      </div>
    );
  }
}
