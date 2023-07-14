import React , { useState }  from 'react'
import LoadingSpinner from "./LoadingSpinner";


function Contacto() {
  const [ email, setEmail] = useState('');
  const [ nombre, setNombre] = useState('');
  const [ texto, setTexto ] = useState('');
  const [ isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  const handleTextoChange = (e) => {
    setTexto(e.target.value);
  };

  const enviarMensaje = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("Enviar formulario");


    fetch('http://127.0.0.1:8000/formulario/nuevo?email='+email+'&nombre='+nombre+'&texto='+texto, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.code === 401){
          console.log("Ha habido un error con el login");
        }else{
          console.log('Mensaje enviado:');  
        }
      })

    .catch((error) => {
      console.error('Error', error);
    })
    .finally(()=>{
      setIsLoading(false);
      window.location.reload();
    });
  }
  const renderUser = (
    <div class="card">
    <div class="card-header">
      Contactar con JCMS
    </div>
    <div class="card-body">
      <form onSubmit={enviarMensaje}>
        <div class="form-group">
            <label for="exampleInputEmail1">Dirección de correo</label>
            <input type="text" id="nombre" onChange={handleNombreChange}  class="form-control"  aria-describedby="emailHelp" placeholder="Tu nombre" required />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Dirección de correo</label>
            <input type="email" id="email" onChange={handleEmailChange}  class="form-control"  aria-describedby="emailHelp" placeholder="Tu correo electrónico" required />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Déjame tu consulta</label>
            <textarea name="texto" id='texto' onChange={handleTextoChange} class="form-control" placeholder='Déja tu consulta' rows={4} cols={43} required />
            

          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" required />
            <label class="form-check-label" for="exampleCheck1">Aceptar</label>
          </div>
          <button type="submit" class="btn btn-primary">Enviar formulario</button>
      </form>
    </div>
  </div>
  );
  return (
    <div>
      {isLoading ? <LoadingSpinner /> : renderUser}
    </div>
  )
}

export default Contacto