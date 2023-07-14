

    function llamadaPersonales() {
        
            fetch('http://127.0.0.1:8000/personales', {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {

                console.log('Respuesta:', data);
                return data;
            })
            .catch((error) => {
                console.error('Error en el con el token:', error);
                // Manejar el error de la API
            })
    }



