import React, { useState } from "react";
import axios from 'axios';

const FiltrarPersonas = ({ token, actualizarPersonas }) => {
    const [documento, setDocumento] = useState('');

    const extraerPersonas = () => {
        const url = "https://personas.ctpoba.edu.ar/api/personas";
        const config = {
            headers: { authorization: token },
            params: { busqueda: documento }
        };

        axios.get(url, config)
            .then((response) => {
                actualizarPersonas(response.data.personas);
                console.log(response.data.personas);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            {/* Renderiza el formulario de filtrado aquí */}
            <button onClick={extraerPersonas}>Filtrar</button>
        </div>
    );
}

export default FiltrarPersonas;
