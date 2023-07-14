import  React, {useEffect, useState } from 'react'
import LoadingSpinner from "./LoadingSpinner";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function DatosPersonales() {
  
  const [ isLoading, setIsLoading] = useState(false);
  const [datos, setDatos] = useState([])
  const [datosForumlario, setDatosFormulario] = useState({
    nombre: '',
    apellido_uno: '',
    apellido_dos: '',
    telefono:'',
    correo: '',
    porfolio: '',
    linkedin: '',
    otros: '',
    titulo: '',
    texto: ''

})

const handleInputChange = (event) => {
     console.log(event.target.name)
     console.log(event.target.value)
    setDatosFormulario({
        ...datosForumlario,
        [event.target.name] : event.target.value
    })
}
  const llamada = ()  => {
   
    setIsLoading(true);
      fetch('http://127.0.0.1:8000/personales', {
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
  const actulizarDatosPersonales = (e)  => {
  
    e.preventDefault();

    setIsLoading(true);
    console.log("estos son los datos a enviar"+ datosForumlario.nombre)
    console.log(e.target[0].value);
    fetch('http://127.0.0.1:8000/personales/edit?bearer='+localStorage.getItem(localStorage.getItem('registro'))+
        '&nombre='+e.target[0].value+
        '&apellido_uno='+e.target[1].value+
        '&apellido_dos='+e.target[2].value+
        '&telefono='+e.target[3].value+
        '&correo='+e.target[4].value+
        '&porfolio='+e.target[5].value+
        '&linkedin='+e.target[6].value+
        '&otros='+e.target[7].value+
        '&titulo='+e.target[8].value+
        '&texto='+e.target[9].value
        ,
        
        {
      method: 'GET',
      //method: 'POST',
       // headers: { 'Content-Type': 'application/json' },
       // body: JSON.stringify(datosForumlario)
    })
    .then((response) => response.json())
    .then((data) => {

        console.log('Respuesta:', data);
        //setDatos(data);
    })
    .catch((error) => {
        console.error('Error en el con el token:', error);
        // Manejar el error de la API
    })
    .finally(()=>{
        setIsLoading(false);
        llamada();
    });
}


  const renderDatos = (
    <form onSubmit={actulizarDatosPersonales}>
    <div class="row">
      <div class="col-sm-6">
        
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" class="form-control" onChange={handleInputChange} name="nombre" defaultValue={datos.nombre}  aria-describedby="emailHelp" placeholder="Tu nombre" required />
            <label for="apellido_uno">Primer apellido</label>
            <input type="text" id="apellido_uno" class="form-control" onChange={handleInputChange} name="apellido_uno" defaultValue={datos.apellidoUno}  aria-describedby="emailHelp" placeholder="Tu primer apellido" required />
            <label for="apellido_dos">Segundo apellido</label>
            <input type="text" id="apellido_dos" class="form-control" onChange={handleInputChange} name="apellido_dos" defaultValue={datos.apellidoDos}   aria-describedby="emailHelp" placeholder="Tu segundo apellido" required />
          </div>
          <div class="form-group">
            <label for="telefono">Tu número de teléfono</label>
            <input type="text" id="telefono" class="form-control" onChange={handleInputChange} name="telefono" defaultValue={datos.telefono}   aria-describedby="emailHelp" placeholder="Tu número de teléfono " required />
          </div>
          <div class="form-group">
            <label for="email">Dirección de correo</label>
            <input type="email" id="email" class="form-control" onChange={handleInputChange} name="correo" defaultValue={datos.correo}  aria-describedby="emailHelp" placeholder="Tu correo electrónico" required />
          </div>
       
      </div>
      <div class="col-sm-6">
              <label for="basic-url">URL porfolio</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon3">Porfolio</span>
                </div>
                <input type="text" class="form-control" id="porfolio" onChange={handleInputChange} defaultValue={datos.enlace1}  name="porfolio" aria-describedby="basic-addon3" />
              </div>
              <label for="basic-url">URL LinkdIn</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon3">LinkedIn</span>
                </div>
                <input type="text" class="form-control" id="linkedin" onChange={handleInputChange} defaultValue={datos.enlace2}   name="linkedin" aria-describedby="basic-addon3" />
              </div>
              <label for="basic-url">URL otros</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon3">Otros</span>
                </div>
                <input type="text" class="form-control" id="otros" onChange={handleInputChange} defaultValue={datos.enlace3}   name="otros" aria-describedby="basic-addon3" />
              </div>

          <div class="form-group">
            <label for="titulo">Titulo descriptivo</label>
            <input type="text"  id="titulo" className="form-control" onChange={handleInputChange} name="titulo" defaultValue={datos.definicionCorta}   aria-describedby="emailHelp" placeholder="Titulo descriptivo" required />
          </div>
          
        
      </div>
    </div>

              
          <div className="form-group">
            <label for="descripcion">Descripción larga</label>
            <textarea id='descripcion' onChange={handleInputChange} name="texto" defaultValue={datos.definicionLarga}  className="form-control" placeholder='La descripción' rows={4} cols={43} required />
          </div>
          <button type="submit" className="btn btn-primary">Modificar datos</button>
    </form>
  )
  return (
    <div className="card datoscontacto">
        <div className="card-header">
            Datos personales
        </div>
        <div className="card-body">
          {isLoading ? <LoadingSpinner /> : renderDatos}
        </div>
    </div>
  )
}

export default DatosPersonales