const url = 'http://localhost:8082/api/hurto'
const listarDatos = async () => {
  let respuesta = ''
  let body = document.getElementById('contenido')
  //url: Es la url de la api.
  //Al deslpegarla en el servidor colocar la api del servidor
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function (data) {
      let listaHurtos = data.hurtos //Capturar el array devuelto por la api
      datos =
        listaHurtos.map(function (hurto) {//Recorrer el array
          respuesta += `<tr><td>${hurto.direccion}</td>` +
            `<td>${hurto.latitud}</td>` +
            `<td>${hurto.longitud}</td>` +
            `<td>${hurto.descripcion}</td>` +
            `<td>${hurto.fecha}</td>` +
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(hurto)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red"  onclick='eliminar(${JSON.stringify(hurto)})'>Eliminar</a></td>` +
            `</tr>`
          body.innerHTML = respuesta
        })
    })
}

const editar = (hurto) => {
  document.getElementById('direccion').value = ''
  document.getElementById('latitud').value = ''
  document.getElementById('longitud').value = ''
  document.getElementById('descripcion').value = ''

  document.getElementById('direccion').value = hurto.direccion
  document.getElementById('latitud').value = hurto.latitud
  document.getElementById('longitud').value = hurto.longitud
  document.getElementById('descripcion').value = hurto.descripcion

}

const eliminar = (fecha) =>{
  const url = 'http://localhost:8082/api/hurto';

  if(confirm('¿esta seguro que desea realizar la eliminacion ')== true){
  
      let hurto = {
          fecha: fecha.fecha}

      fetch(url,  {
          method: 'DELETE',
          mode: 'cors',
          body: JSON.stringify(hurto),//Convertir el objeto _usuario  a un JSON
          headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then(json => {
          alert(json.msg)//Mensaje que retorna la API
          
      })
  }
}

const registrar = async () => {
  let _direccion = document.getElementById('direccion').value
  let _latitud = document.getElementById('latitud').value
  let _longitud = document.getElementById('longitud').value
  let _descripcion = document.getElementById('descripcion').value
  const url = 'http://localhost:8082/api/hurto';

    let hurto = {
      direccion: _direccion,
      latitud: _latitud,
      longitud: _longitud,
      descripcion: _descripcion
    }

    console.log(hurto)
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(hurto),//Convertir el objeto usuario a un JSON
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        //alert(json.msg)
        console.log(
          json.msg,
        )
      });
  } 

const actualizar = async () => {
    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value
  const url = 'http://localhost:8082/api/hurto';

    let _hurto = {
    direccion: _direccion,
    latitud: _latitud,
    longitud: _longitud,
    descripcion: _descripcion
  }

  console.log(_hurto)
       fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(_hurto),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then((response) => response.json())
      .then(json => {
        alert(json.msg)
      }).then(() => {
        location.reload()
      })

      
  } 

  


if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar')
    .addEventListener("click", () => { registrar() })
}

if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar')
    .addEventListener("click", () => { actualizar() })
}


