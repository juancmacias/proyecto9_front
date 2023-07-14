import React, { useState } from 'react';
import LoadingSpinner from "./LoadingSpinner";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    setIsLoading(true);
    // Realizar el llamado a la API de login
    const loginData = {
      username: email,
      password: password,
    };

    fetch('http://127.0.0.1:8000/api/login_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.code === 401){
          console.log("Ha habido un error con el login");
        }else{
          // Guardar el token en el localStorage
          //localStorage.setItem('token', data.token);
          //console.log('Token guardado:', data.token);
          checktoken(data.token);
        }
        // Realizar cualquier redirección o acción necesaria después del login exitoso
      })
      .catch((error) => {
        console.error('Error en el login:', error);
        // Manejar el error de la API
      })
      .finally(()=>{setIsLoading(false);});
  };
  const checktoken = (token) => {
    console.log("este es el toke para comprobar "+ token)
    fetch('http://127.0.0.1:8000/checktoken?bearer='+token, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {

          console.log('contenido token:', data.auth);
          localStorage.setItem("registro", data.auth[0]);
          localStorage.setItem(data.auth[0], token);
          window.location.reload();

       
      })
      .catch((error) => {
        console.error('Error en el con el token:', error);
        // Manejar el error de la API
      })
      .finally(()=>{setIsLoading(false);});
  }
  const renderUser = (
    <div class="card">
              <div class="card-header">
                Iniciar sesión
              </div>
              <div class="card-body">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Dirección de correo</label>
                    <input type="email" id="email" onChange={handleEmailChange} class="form-control"  aria-describedby="emailHelp" placeholder="Tu correo electrónico" required />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Contraseña</label>
                    <input type="password" onChange={handlePasswordChange} class="form-control" id="password" placeholder="Tu contraseña" required />
                  </div>
                  <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                </form>
              </div>
            </div>
  );
  return (
    <div>
      {isLoading ? <LoadingSpinner /> : renderUser}
    </div>
  );
}

export default Login;