import React, { Component } from 'react';
import axios from 'axios';

class AgregarPersona extends Component {
  state = {
    nombres: this.props.persona ? this.props.persona.nombres : '',
    apellidos: this.props.persona ? this.props.persona.apellidos : '',
    documento: this.props.persona ? this.props.persona.documento : ''
  };

  manejarChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  manejarSubmit = (event) => {
    event.preventDefault();
    const { nombres, apellidos, documento } = this.state;
    const { persona, token, onAddPersona, onUpdatePersona } = this.props;

    const datosPersona = { nombres, apellidos, documento };

    if (persona) {
      axios.put(`https://personas.ctpoba.edu.ar/api/personas/${persona._id}`, datosPersona, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(response => {
        onUpdatePersona(persona._id, response.data.persona);
      })
      .catch(error => {
        console.error('Error al editar persona:', error.response ? error.response.data : error.message);
      });
    } else {
      axios.post('https://personas.ctpoba.edu.ar/api/personas', datosPersona, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(response => {
        onAddPersona(response.data.persona);
      })
      .catch(error => {
        console.error('Error al agregar persona:', error.response ? error.response.data : error.message);
      });
    }
  };

  render() {
    const { nombres, apellidos, documento } = this.state;
    const { persona } = this.props;

    return (
      <form onSubmit={this.manejarSubmit}>
        <input
          type="text"
          name="nombres"
          value={nombres}
          onChange={this.manejarChange}
          placeholder="Nombres"
        />
        <input
          type="text"
          name="apellidos"
          value={apellidos}
          onChange={this.manejarChange}
          placeholder="Apellidos"
        />
        <input
          type="text"
          name="documento"
          value={documento}
          onChange={this.manejarChange}
          placeholder="Documento"
        />
        <button type="submit">{persona ? 'Actualizar Persona' : 'Agregar Persona'}</button>
      </form>
    );
  }
}

export default AgregarPersona;
