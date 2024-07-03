import React, { Component } from 'react';
import axios from 'axios';
import './EditarPersona.css';

class EditarPersona extends Component {
  state = {
    id: 0,
    dni: "",
    nombre: "",
    apellido: "",
    fecNac: "",
    numCel: "",
    domicilio: "",
    mail: ""
  };

  manejarChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  manejarSubmit = (event) => {
    event.preventDefault();
    const { token } = this.props;
    const { id, dni, nombre, apellido, fecNac, numCel, domicilio, mail } = this.state;

    this.editarPersona(token, id, dni, nombre, apellido, fecNac, numCel, domicilio, mail);
  };

  editarPersona = (token, id, dni, nombre, apellido, fecNac, numCel, domicilio, mail) => {
    const url = `https://personas.ctpoba.edu.ar/api/personas/${id}`;
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
          // Aquí podrías hacer alguna acción adicional si es necesario
        } else {
          alert("Hubo un inconveniente al editar los datos de la persona.");
        }
      })
      .catch(error => {
        console.error('Error al editar persona:', error);
      });
  };

  render() {
    return (
      <div className='Cuadro'>
        <h2>EDITAR DATOS DE PERSONA</h2>
        <input 
          type="number" 
          className='Dato' 
          placeholder='ID del usuario'
          onChange={(e) => this.setState({ id: e.target.value })}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          placeholder='D.N.I'
          onChange={(e) => this.setState({ dni: e.target.value })}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          placeholder='Nombre' 
          onChange={(e) => this.setState({ nombre: e.target.value })}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          placeholder='Apellido' 
          onChange={(e) => this.setState({ apellido: e.target.value })}
          required
        />
        <input 
          type="date" 
          className='Dato'
          style={{ width: '222.5px' }}
          placeholder='Fecha de nacimiento' 
          onChange={(e) => this.setState({ fecNac: e.target.value })}
          required
        />
        <input 
          type="number" 
          className='Dato' 
          placeholder='Numero de celular'
          onChange={(e) => this.setState({ numCel: e.target.value })}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          placeholder='Domicilio'
          onChange={(e) => this.setState({ domicilio: e.target.value })}
          required
        />
        <input 
          type="text" 
          className='Dato' 
          placeholder='E-mail'
          onChange={(e) => this.setState({ mail: e.target.value })}
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
