import  React, {useEffect, useState } from 'react'
import { format } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";


function Formilarios() {

    const [ isLoading, setIsLoading] = useState(false);
    const [datos, setDatos] = useState([])

    const llamada = ()  => {
        setIsLoading(true);
        fetch('http://127.0.0.1:8000/formulario?bearer='+localStorage.getItem(localStorage.getItem('registro')), {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
    
            //console.log('Respuesta:', data);
            setDatos(data);
        })
        .catch((error) => {
            console.error('Error en el con el token:', error);
            // Manejar el error de la API
        })
        .finally(()=>{
            setIsLoading(false);
        });
    }
    useEffect(()=> {
        llamada();
    }, [])
    const renderTabla = (
        datos.map((dato, index) => (
            <tr >
                <td>{format(new Date(dato.fecha), 'dd/MM/yyyy HH:mm')}</td>
                <td><div className="recortar" title={dato.correo}>{dato.correo}</div></td>
                <td>{dato.nombre}</td>
                <td>{dato.motivo}</td>
            </tr>
        ))
    )
    return (
        <div class="card tabla">
            <div class="card-header">
                Formularios de contacto
            </div>
            <div class="card-body">
                <table id="myTable" class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Dia/hora</th>
                            <th>Correo</th>
                            <th>Nombre</th>
                            <th>Comentario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <LoadingSpinner /> : renderTabla}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Formilarios