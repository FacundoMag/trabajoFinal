import React, { Component } from 'react';
import axios from 'axios';

class EditarPersona extends Component {
  state = {
    id: this.props.persona ? this.props.persona._id : '',
    dni: this.props.persona ? this.props.persona.documento : '',
    nombre: this.props.persona ? this.props.persona.nombres : '',
    apellido: this.props.persona ? this.props.persona.apellidos : '',
    fecNac: this.props.persona ? this.props.persona.fechaNac : '',
    numCel: this.props.persona ? this.props.persona.telefono : '',
    domicilio: this.props.persona ? this.props.persona.domicilio : '',
    mail: this.props.persona ? this.props.persona.mail : ''
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
          this.props.onUpdatePersona(id, response.data.persona); // Update parent state
        } else {
          alert("Hubo un inconveniente al editar los datos de la persona.");
        }
      })
      .catch(error => {
        console.error('Error al editar persona:', error);
      });
  };

  render() {
    const { dni, nombre, apellido, fecNac, numCel, domicilio, mail } = this.state;

    return (
      <div className='Cuadro'>
        <h2>EDITAR DATOS DE PERSONA</h2>
        <form onSubmit={this.manejarSubmit}>
          <input 
            type="text" 
            name="dni"
            className='Dato' 
            placeholder='D.N.I'
            value={dni}
            onChange={this.manejarChange}
            required
          />
          <input 
            type="text" 
            name="nombre"
            className='Dato' 
            placeholder='Nombre' 
            value={nombre}
            onChange={this.manejarChange}
            required
          />
          <input 
            type="text" 
            name="apellido"
            className='Dato' 
            placeholder='Apellido' 
            value={apellido}
            onChange={this.manejarChange}
            required
          />
          <input 
            type="date" 
            name="fecNac"
            className='Dato'
            style={{ width: '222.5px' }}
            placeholder='Fecha de nacimiento'
            value={fecNac}
            onChange={this.manejarChange}
            required
          />
          <input 
            type="text" 
            name="numCel"
            className='Dato' 
            placeholder='Numero de celular'
            value={numCel}
            onChange={this.manejarChange}
            required
          />
          <input 
            type="text" 
            name="domicilio"
            className='Dato' 
            placeholder='Domicilio'
            value={domicilio}
            onChange={this.manejarChange}
            required
          />
          <input 
            type="email"
            name="mail"
            className='Dato' 
            placeholder='E-mail'
            value={mail}
            onChange={this.manejarChange}
            required
          />
          <button
            className='Boton'
            type="submit"
          >Cambiar datos</button>
        </form>
      </div>
    );
  }
}

export default EditarPersona;
