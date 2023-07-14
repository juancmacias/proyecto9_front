import React, { useState }  from 'react';
import LoadingSpinner from "./Componente/LoadingSpinner";
import Login from './Componente/login';
import Formularios from './Componente/formilarios';
import Listado from './Componente/listado';
import 'bootstrap/dist/css/bootstrap.css';
import Contacto from './Componente/Contacto';
import DatosPersonales from './Componente/DatosPersonales';
import Frame from './Componente/frame';

function App() {
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ estado, setEstado ] = useState(false);
  const [ registro, setRegistro ] = useState(false);
  const [ isLoading, setIsLoading] = useState(false);
  const [ seleccion, setSeleccion] = useState('');

  const [ sesion, setSesion] = useState(localStorage.getItem('registro'));

  console.log("Estado = "+sesion);


  
  const cerrarSesion = () => {
    setIsLoading(true);
      console.log("Cerrar sesión.");
      

      fetch('http://127.0.0.1:8000/logout', {
        method: 'GET',
      })
      .catch((error) => {
        console.error('Error en el con el token:', error);
      })
      .finally(()=>{
        localStorage.clear();
        setSesion(localStorage.getItem('registro'));
        window.location.reload();
        setIsLoading(false);});
  }
  const loginEstado = ()=>{
    setSesion(localStorage.getItem('registro'));
    estado ? setEstado(false) : setEstado(true);
    setRegistro(false);
    setSeleccion('');
  }
  const Registrarse = ()=>{
    setEstado(false);
    registro ? setRegistro(false) : setRegistro(true);
    setSeleccion('');
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
 
  const verListado = (select) => {
    setEstado(false);
    setRegistro(false);
    setSeleccion(select);
  }
  const registroSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("datos: "+ email + " - - "+ password);
    fetch('http://127.0.0.1:8000/registration?mail='+email+'&password='+password, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.code === 401){
          console.log("Ha habido un error con el login");
        }else{
          // Guardar el token en el localStorage
          //localStorage.setItem('token', data.token);
          console.log('Todo ok:'+data.registro);

        }
        // Realizar cualquier redirección o acción necesaria después del login exitoso
      })
      .catch((error) => {
        console.error('Error en el login:', error);
        // Manejar el error de la API
      })
      .finally(() => {setIsLoading(false);loginEstado();});
  };
  const renderUser = (
    <div class="card">
              <div class="card-header">
                Registrarse
              </div>
              <div class="card-body">
                <form onSubmit={registroSubmit}>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Dirección de correo</label>
                    <input type="email" id="email" onChange={handleEmailChange} class="form-control"  aria-describedby="emailHelp" placeholder="Tu correo electrónico" required />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Contraseña</label>
                    <input type="password" onChange={handlePasswordChange} class="form-control" id="password" placeholder="Tu contraseña" required />
                  </div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Aceptar</label>
                  </div>
                  <button type="submit" class="btn btn-primary">Registrarme</button>
                </form>
              </div>
            </div>
  );
  return (
    <div class="page">
        
        <input type="checkbox" id="themeSwitch" name="theme-switch" class="theme-switch__input" />
          <label for="themeSwitch" class="theme-switch__label">
              <span>Claro / Oscuro</span>
          </label>


          
        
        {(function () {
                switch (sesion) {
                    case 'ROLE_ADMIN':
                        return (
                          <nav>
                            <button onClick={() => verListado('')}  class={`btn btn-danger btn-lg`}>&lt;Macías/&gt;</button>
                            <div className="dropup-content loginadmin">
                              <div>Hola administrador</div>
                              <button onClick={() => verListado('Dpersonales')}  className='visible'>Datos personales</button>
                              <button onClick={() => verListado('formularios')}  className='visible'>Formularios contacto</button>
                              <button onClick={() => verListado('listado')}  className='visible'>Lista items CV</button>
                              <button onClick={cerrarSesion} className= 'visible'>Login out</button>
                            </div>
                          </nav>
                        );

                    case 'ROLE_USER':
                        return (
                          <nav>
                            <button onClick={() => verListado('')}  class={`btn btn-success btn-lg`}>&lt;Macías/&gt;</button>
                            <div className="dropup-content loginuser">
                              <div>Hola usuario</div>
                              <button onClick={() => verListado('contacto')}  className='visible' title='Contactar con Juan Carlos'>Contactar</button>
                            </div>
                             
                            <button type="button" onClick={cerrarSesion} class="btn btn-outline-info" title='Cerrar sesión'>Exit</button>
                          </nav>
                        );

                    default:
                      return(
                        <nav>
                          <button onClick={() => verListado('')}  class={`btn btn-primary btn-lg`}>&lt;Macías/&gt;</button>
                          <div className="dropup-content sesion">
                            <button onClick={() => verListado('login')} className='visible' title='Iniciar sesión'>Login</button>
                            <button onClick={Registrarse} className="visible" title='Registrarme en la página'>Register</button>
                            <button onClick={() => verListado('contacto')} className='visible' title='Contactar con Juan Carlos'>Contactar</button>
                          </div>
                        </nav>
                      );
                }
            })()}



        

          

      
        
        
        <main>

          <div className={registro ? 'visible': 'oculto'}>
            {isLoading ? <LoadingSpinner /> : renderUser}
          </div>
          {(function () {
                switch (seleccion) {
                  case 'login':
                        return (
                          <Login/>
                        );
                    case 'formularios':
                        return (
                          <Formularios/>
                        );

                    case 'listado':
                        return (
                          <Listado/>
                        );
                    case 'Dpersonales':
                        return (
                            <DatosPersonales/>
                          );
                    case 'contacto':
                        return (
                            <Contacto/>
                          );
                    default:
                      return(
                        <Frame className="wrapper visible"/>
                      );
                }
            })()}
          
        </main>
    </div>
  );
}

export default App;
