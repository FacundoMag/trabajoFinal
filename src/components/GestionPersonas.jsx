import React, { Component } from 'react';
import axios from 'axios';
import './GestionPersonas.css';

class GestionarPersonas extends Component {
  state = {
    personas: [],
    nombres: '',
    apellidos: '',
    documento: '',
    editando: false,
    personaId: null
  };

  componentDidMount() {
    this.cargarPersonas();
  }

  cargarPersonas = () => {
    const url = 'https://personas.ctpoba.edu.ar/api/personas';
    axios.get(url, {
      headers: {
        Authorization: `${this.props.token}`
      }
    })
    .then(response => {
      const personas = response.data.personas || [];
      this.setState({ personas });
    })
    .catch(error => {
      console.error('Error al cargar personas:', error.response ? error.response.data : error.message);
    });
  };

  manejarChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  manejarSubmit = (event) => {
    event.preventDefault();
    const { nombres, apellidos, documento, editando, personaId } = this.state;
    const datosPersona = { nombres, apellidos, documento };

    if (!this.props.token) {
      console.error('Token de autorización no disponible');
      return;
    }

    if (editando) {
      // Editar persona existente
      axios.put(`https://personas.ctpoba.edu.ar/api/personas/${personaId}`, datosPersona, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(() => {
        this.cargarPersonas();
        this.setState({ nombres: '', apellidos: '', documento: '', editando: false, personaId: null });
      })
      .catch(error => {
        console.error('Error al editar persona:', error.response ? error.response.data : error.message);
      });
    } else {
      // Agregar nueva persona
      axios.post('https://personas.ctpoba.edu.ar/api/personas', datosPersona, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(() => {
        this.cargarPersonas();
        this.setState({ nombres: '', apellidos: '', documento: '' });
      })
      .catch(error => {
        console.error('Error al agregar persona:', error.response ? error.response.data : error.message);
      });
    }
  };

  manejarEditar = (persona) => {
    // Cargar datos de la persona seleccionada para editar
    this.setState({
      nombres: persona.nombres || '',
      apellidos: persona.apellidos || '',
      documento: persona.documento || '',
      editando: true,
      personaId: persona._id
    });
  };

  manejarEliminar = (personaId) => {
    if (!this.props.token) {
      console.error('Token de autorización no disponible');
      return;
    }

    // Eliminar persona por ID
    axios.delete(`https://personas.ctpoba.edu.ar/api/personas/${personaId}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
    .then(() => {
      this.cargarPersonas();
      console.log('Persona eliminada correctamente');
    })
    .catch(error => {
      console.error('Error al eliminar persona:', error.response ? error.response.data : error.message);
    });
  };

  render() {
    const { personas, nombres, apellidos, documento, editando } = this.state;

    return (
      <div className='container'>
        <h2>Gestionar Personas</h2>
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
          <button type="submit">{editando ? 'Actualizar Persona' : 'Agregar Persona'}</button>
        </form>

        <h2>Lista de Personas</h2>
        <ul>
          {personas.map((persona) => (
            <li key={persona._id}>
              {persona.nombres} {persona.apellidos} - {persona.documento}
              <button className='editar' onClick={() => this.manejarEditar(persona)}>Editar</button>
              <button className='eliminar' onClick={() => this.manejarEliminar(persona._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GestionarPersonas;
