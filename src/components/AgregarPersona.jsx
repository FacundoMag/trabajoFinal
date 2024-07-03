import React, { Component } from 'react';
import axios from 'axios';

class AgregarPersona extends Component {
  state = {
    nombres: '',
    apellidos: '',
    documento: ''
  };

  manejarChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  manejarSubmit = (event) => {
    event.preventDefault();
    const { nombres, apellidos, documento } = this.state;
    const { token, onAddPersona } = this.props;

    const datosPersona = { nombres, apellidos, documento };

    axios.post('https://personas.ctpoba.edu.ar/api/personas', datosPersona, {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(response => {
      onAddPersona(response.data.persona);
      this.setState({ nombres: '', apellidos: '', documento: '' }); // Reset form
    })
    .catch(error => {
      console.error('Error al agregar persona:', error.response ? error.response.data : error.message);
    });
  };

  render() {
    const { nombres, apellidos, documento } = this.state;

    return (
      <form onSubmit={this.manejarSubmit}>
        <input
          type="text"
          name="nombres"
          value={nombres}
          onChange={this.manejarChange}
          placeholder="Nombres"
          required
        />
        <input
          type="text"
          name="apellidos"
          value={apellidos}
          onChange={this.manejarChange}
          placeholder="Apellidos"
          required
        />
        <input
          type="text"
          name="documento"
          value={documento}
          onChange={this.manejarChange}
          placeholder="Documento"
          required
        />
        <button type="submit">Agregar Persona</button>
      </form>
    );
  }
}

export default AgregarPersona;
