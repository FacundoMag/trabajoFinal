import React, { Component } from "react";
import Registro from "./components/Registro";
import Login from "./components/Login";
import GestionarPersonas from "./components/GestionPersonas";

export default class App extends Component {
  state = {
    autenticado: false,
    usuario: null,
    token: null,
    mostrandoLogin: true,
  };

  manejarLogin = (usuario, token) => {
    this.setState({ autenticado: true, usuario, token });
  };

  cambiarFormulario = () => {
    this.setState(prevState => ({ mostrandoLogin: !prevState.mostrandoLogin }));
  };

  render() {
    const { autenticado, mostrandoLogin } = this.state;

    let contenido;
    if (!autenticado) {
      if (mostrandoLogin) {
        contenido = (
          <div>
            <Login manejarLogin={this.manejarLogin} />
            <p>No tienes cuenta? <span onClick={this.cambiarFormulario} style={{ color: 'blue', cursor: 'pointer' }}>Regístrate</span></p>
          </div>
        );
      } else {
        contenido = (
          <div>
            <Registro manejarLogin={this.manejarLogin} />
            <p>Ya tienes una cuenta? <span onClick={this.cambiarFormulario} style={{ color: 'blue', cursor: 'pointer' }}>Inicia sesión</span></p>
          </div>
        );
      }
    } else {
      contenido = <GestionarPersonas token={this.state.token} />;
    }

    return (
      <div>
        {contenido}
      </div>
    );
  }
}
