import React, {useEffect, useState, useRef } from 'react';
import LoadingSpinner from "./LoadingSpinner";




function Listado() {
    const [ isLoading, setIsLoading] = useState(false);
    const [datos, setDatos] = useState([]);
    const [ seleccion, setSeleccion] = useState('');
    const [ id, setID] = useState('');
    const [ mostrar, setMostrar] = useState('');

    const isCheck = useRef(false);
    const [datosForumlario, setDatosFormulario] = useState({

        de: '',
        titulo: '',
        empresa: '',
        descripcion:'',
        periodo: '',
        logros: '',
        logro1: '',
        logro2: ''
    })
    const llamada = ()  => {
   
        setIsLoading(true);
          fetch('http://127.0.0.1:8000/cv', {
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
                <td>{dato.de}</td>
                <td><div className="recortar" title={dato.titulo}>{dato.titulo}</div></td>
                <td>
                    <button className={`btn btn-primary btn-sm`} onClick={() => verListado('editar')} >Editar</button>
                    <button className={`btn btn-danger btn-sm`} onClick={() => verListado('borrar', dato.id)} >Borrar</button>
                </td>
            </tr>
        ))
    )
    const borrar = (id) => {
        console.log("Borrando datos")
        //e.preventDefault();
        setIsLoading(true);
        fetch('http://127.0.0.1:8000/cv/del?bearer='+localStorage.getItem(localStorage.getItem('registro'))+
        '&id='+id
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
            llamada();
            setIsLoading(false);
            verListado('')
        });
    }
    const enviardatosdelCV = (e)  => {
        console.log("Enviando los datos")
        e.preventDefault();
        setIsLoading(true);
        fetch('http://127.0.0.1:8000/cv/new?bearer='+localStorage.getItem(localStorage.getItem('registro'))+
        '&de='+e.target[0].value+
        '&titulo='+e.target[1].value+
        '&empresa='+e.target[2].value+
        '&descripcion='+e.target[3].value+
        '&periodo='+e.target[4].value+
        '&logros='+e.target[5].value+
        '&logro1='+e.target[6].value+
        '&logro2='+e.target[7].value
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
            llamada();
            setIsLoading(false);
            verListado('')
        });
    }
    const handleChangeBox = (estado) => {
        isCheck.current = estado;
        console.log("estado "+ isCheck.current)

      };
    const verListado = (select, id) => {
        setID(id)
        setSeleccion(select);
        setMostrar('');
      }

    const opcion = (seleccion) => {
        setMostrar('');
        console.log("Seleccionado "+ seleccion);
        switch (seleccion){
            case "experiencia":
                setMostrar( 
                    <form onSubmit={enviardatosdelCV}>                   
                        <div class="form-group">
                            <input type="hidden" value={seleccion} name="de" />
                            <label for="titulo">Titulo</label>
                            <input type="text" id="titulo" class="form-control" name="titulo" aria-describedby="emailHelp" placeholder="Titulo" required />
                            <label for="empresa">Empresa</label>
                            <input type="text" id="empresa" class="form-control" name="empresa" aria-describedby="emailHelp" placeholder="Nombre de la empresa" required />
                            <label for="descripcion">Descripción</label>
                            <textarea id='descripcion' name="descripcion"   className="form-control" placeholder='La descripción' rows={4} cols={43} required />
                            <label for="periodo">Periodo</label>
                            <input type="text" id="periodo" class="form-control" name="periodo"   aria-describedby="emailHelp" placeholder="Periodo" required />
                            <label for="logros">Logros</label>
                            <input type='checkbox' id='logros' name='logros' onChange={(e) => handleChangeBox(e.target.checked ? true:false)} />
                            <br />

                            
                                <label for="logro1">Primer logro</label>
                                <input type="text" id="logro1" class="form-control" name="logro1"  aria-describedby="emailHelp" placeholder="Descripción del logro" />
                                <label for="logro2">Segundo logro</label>
                                <input type="text" id="logro2" class="form-control"  name="logro2"  aria-describedby="emailHelp" placeholder="Descripción del logro" />

                        </div>
                        <button className={`btn btn-success btn-sm`} >Guardar</button>
                    </form>
                )
                break;
            case "formacion":
                setMostrar(
                    <form onSubmit={enviardatosdelCV}>                   
                        <div class="form-group">
                            <input type="hidden" value={seleccion} name="de" />
                            <label for="titulo">Titulo</label>
                            <input type="text" id="titulo" class="form-control" name="titulo" aria-describedby="emailHelp" placeholder="Titulo" required />
                            <label for="empresa">Academia</label>
                            <input type="text" id="empresa" class="form-control" name="empresa" aria-describedby="emailHelp" placeholder="Nombre de la academia" required />
                            <label className="oculto" for="descripcion">Descripción</label>
                            <textarea id='descripcion' name="descripcion"   className="form-control oculto" placeholder='La descripción' rows={4} cols={43}  />
                            <label for="periodo">Periodo</label>
                            <input type="text" id="periodo" class="form-control" name="periodo"   aria-describedby="emailHelp" placeholder="Periodo" required />

                            <label className="oculto" for="logros">Logros</label>
                            <input type="hidden" id='logros' name='logros' value=""  />
                            <br />

                            
                                <label className="oculto" for="logro1">Primer logro</label>
                                <input type="hidden" id="logro1" class="form-control" name="logro1"  aria-describedby="emailHelp" placeholder="Descripción del logro" />
                                <label className="oculto" for="logro2">Segundo logro</label>
                                <input type="hidden" id="logro2" class="form-control"  name="logro2"  aria-describedby="emailHelp" placeholder="Descripción del logro" />

                        </div>
                        <button className={`btn btn-success btn-sm`} >Guardar</button>
                    </form>
                )
                break;
            case "voluntariado":
                setMostrar(
                    <form onSubmit={enviardatosdelCV}>                   
                    <div class="form-group">
                        <input type="hidden" value={seleccion} name="de" />
                        <label for="titulo">Empresa</label>
                        <input type="text" id="titulo" class="form-control" name="titulo" aria-describedby="emailHelp" placeholder="Empresa" required />
                        <label for="empresa">Descripción de voluntariado</label>
                        <input type="text" id="empresa" class="form-control" name="empresa" aria-describedby="emailHelp" placeholder="Descripción del voluntariado" required />
                        <label className="oculto" for="descripcion">Descripción</label>
                        <textarea id='descripcion' name="descripcion"   className="form-control oculto" placeholder='La descripción' rows={4} cols={43}  />
                        <label className="oculto" for="periodo">Periodo</label>
                        <input type="text" id="periodo" class="form-control" name="periodo"   aria-describedby="emailHelp" placeholder="Periodo" className="oculto" />

                        <label className="oculto" for="logros">Logros</label>
                        <input type="hidden" id='logros' name='logros' value=""  />
                        <br />

                        
                            <label className="oculto" for="logro1">Primer logro</label>
                            <input type="hidden" id="logro1" class="form-control" name="logro1"  aria-describedby="emailHelp" placeholder="Descripción del logro" />
                            <label className="oculto" for="logro2">Segundo logro</label>
                            <input type="hidden" id="logro2" class="form-control"  name="logro2"  aria-describedby="emailHelp" placeholder="Descripción del logro" />

                    </div>
                    <button className={`btn btn-success btn-sm`} >Guardar</button>
                </form>
                )
                break;
            case "habilidades":
                setMostrar(
    
                )
                break;
        }
        
      }
  return (

    <>
            {(function () {
        switch (seleccion) {
            case 'nuevo':
                return (
                    <div className="card">
                        <div className="card-header">
                            nuevo
                        </div>
                        <div className="card-body">
                            <button className={`btn btn-success btn-sm`} onClick={() => verListado('')} >Cancelar</button>
                                <select name="de" onChange={(e) => opcion(e.target.value)} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                    <option value="" selected>Elegir sección</option>
                                    <option value="experiencia">Experiencia</option>
                                    <option value="formacion">Formación</option>
                                    <option value="voluntariado">Voluntariado</option>
                                    <option value="habilidades">Habilidades</option>
                                </select>
                                {isLoading ? <LoadingSpinner /> : mostrar}
                        </div>
                    </div>
                );

            case 'editar':
                return (
                    <div className="card">
                        <div className="card-header">
                            editara
                        </div>
                        <div className="card-body">
                            <button className={`btn btn-success btn-lg`} onClick={() => verListado('')} >Cancelar</button>
                        </div>
                    </div>
                );
                case 'borrar':
                    return (
                        <div className="card">
                            <div className="card-header">
                                Borrar registro
                            </div>
                            <div className="card-body">
                                <button className={`btn btn-success btn-lg`} onClick={() => verListado('')} >Cancelar</button>
                                <p>¿Esta de acuerdo en borrar el registro {id}?</p>
                                <button className={`btn btn-danger btn-sm`} onClick={() => borrar(id)} >Si, borrar</button>
                            </div>
                        </div>
                    );
            default:
              return(
                <div className="card tabla">
                <div className="card-header">
                    Listado de items CV
                </div>
                                <div className="card-body">
                                <button className={`btn btn-success btn-lg`} onClick={() => verListado('nuevo')} >Insertar nuevo item</button>
                                    <table id="myTable" className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Relación</th>
                                                <th>Titulo</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isLoading ? <LoadingSpinner /> : renderTabla}
                                        </tbody>
                                    </table>
                                </div>
                </div>
              );
        }
    })()}

    </>
  )
}

export default Listado