import React, { Component } from 'react';
import axios from 'axios';
import AgregarPersona from './AgregarPersona';
import EditarPersona from './EditarPersona';

class GestionarPersonas extends Component {
  state = {
    personas: [],
    editando: false,
    personaEditando: null
  };

  componentDidMount() {
    this.cargarPersonas();
  }

  cargarPersonas = () => {
    axios.get('https://personas.ctpoba.edu.ar/api/personas', {
      headers: {
        Authorization: `${this.props.token}`
      }
    })
    .then(response => {
      this.setState({ personas: response.data.personas });
    })
    .catch(error => {
      console.error('Error al cargar personas:', error);
    });
  };

  onAddPersona = (persona) => {
    this.setState(prevState => ({
      personas: [...prevState.personas, persona]
    }));
  };

  onUpdatePersona = (id, updatedPersona) => {
    this.setState(prevState => ({
      personas: prevState.personas.map(persona => persona._id === id ? updatedPersona : persona),
      editando: false,
      personaEditando: null
    }));
  };

  manejarEditar = (persona) => {
    this.setState({
      editando: true,
      personaEditando: persona
    });
  };

  manejarEliminar = (persona_id) => {
    axios.delete(`https://personas.ctpoba.edu.ar/api/personas/${persona_id}`, {
      headers: {
        Authorization: `${this.props.token}`
      }
    })
    .then(response => {
      if (response.data.status === "ok") {
        this.setState(prevState => ({
          personas: prevState.personas.filter(persona => persona._id !== persona_id)
        }));
        alert("Se ha eliminado correctamente a la persona");
      } else {
        alert('Hubo un error al eliminar a la persona.');
      }
    })
    .catch(error => {
      console.error('Error al eliminar persona:', error);
    });
  };

  render() {
    const { personas, editando, personaEditando } = this.state;
    const { token } = this.props;

    return (
      <div>
        <h2>Gestionar Personas</h2>
        {editando ? (
          <EditarPersona
            token={token}
            persona={personaEditando}
            onUpdatePersona={this.onUpdatePersona}
          />
        ) : (
          <AgregarPersona
            token={token}
            onAddPersona={this.onAddPersona}
          />
        )}
        <ul>
          {personas.map((persona) => (
            <li key={persona._id}>
              {persona.nombres} {persona.apellidos} - {persona.documento}
              <button onClick={() => this.manejarEditar(persona)}>Editar</button>
              <button onClick={() => this.manejarEliminar(persona._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GestionarPersonas;
