import React, { Component } from 'react';
import axios from 'axios';
import './EditarPersona.css';

class EditarPersona extends Component {
  state = {
    id: '',
    dni: '',
    nombre: '',
    apellido: '',
    fecNac: '',
    numCel: '',
    domicilio: '',
    mail: ''
  };

  componentDidMount() {
    const { persona } = this.props;
    if (persona) {
      this.setState({
        id: persona.id,
        dni: persona.documento,
        nombre: persona.nombres,
        apellido: persona.apellidos,
        fecNac: persona.fechaNac,
        numCel: persona.telefono,
        domicilio: persona.domicilio,
        mail: persona.mail
      });
    }
  }

  manejarChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  manejarSubmit = (event) => {
    event.preventDefault();
    const { token } = this.props;
    const { id, dni, nombre, apellido, fecNac, numCel, domicilio, mail } = this.state;

    if (id) {
      this.editarPersona(token, id, dni, nombre, apellido, fecNac, numCel, domicilio, mail);
    } else {
      console.error('ID de la persona no está definido');
    }
  };

  editarPersona = (token, id, dni, nombre, apellido, fecNac, numCel, domicilio, mail) => {
    const url = `https://personas.ctpoba.edu.ar/api/personas/`;
    const data = {
      documento: dni,
      nombres: nombre,
      apellidos: apellido,
      fechaNac: fecNac,
      telefono: numCel,
      domicilio,
      mail
    };
    const config = {
      headers: {
        Authorization: token
      }
    };

    axios.put(url, data, config)
      .then(response => {
        if (response.data.status === "ok") {
          alert("Se ha actualizado correctamente los datos de la persona");
        } else {
          alert("Hubo un inconveniente al editar los datos de la persona.");
        }
      })
      .catch(error => {
        console.error('Error al editar persona:', error.response ? error.response.data : error.message);
      });
  };

  render() {
    return (
      <div className='Cuadro'>
        <h2>EDITAR DATOS DE PERSONA</h2>
        <input 
          type="number" 
          className='Dato' 
          name='id'
          placeholder='ID del usuario'
          onChange={this.manejarChange}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          name='dni'
          placeholder='D.N.I'
          onChange={this.manejarChange}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          name='nombre'
          placeholder='Nombre' 
          onChange={this.manejarChange}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          name='apellido'
          placeholder='Apellido' 
          onChange={this.manejarChange}
          required
        />
        <input 
          type="date" 
          className='Dato'
          style={{ width: '222.5px' }}
          name='fecNac'
          placeholder='Fecha de nacimiento' 
          onChange={this.manejarChange}
          required
        />
        <input 
          type="number" 
          className='Dato' 
          name='numCel'
          placeholder='Numero de celular'
          onChange={this.manejarChange}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          name='domicilio'
          placeholder='Domicilio'
          onChange={this.manejarChange}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          name='mail'
          placeholder='E-mail'
          onChange={this.manejarChange}
          required
        />
        <button
          className='Boton'
          onClick={this.manejarSubmit}
        >Cambiar datos</button>
      </div>
    );
  }
}

export default EditarPersona;
