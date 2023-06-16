//Importar paquetes requeridos de node
const { response } = require('express');

//Importacion de los modelos 
const Hurto = require('../models/hurto');

//insercion, modificacion de datos

//consultar
const hurtoGet = async (req, res = response) => {
  const { fecha } = req.body;
  let hurtos;
  if (fecha) {
    // Si se proporciona el parámetro "nombre", filtrar por ese nombre
    hurtos = await Hurto.find({ fecha: fecha });
  } else {
    // Si no se proporciona el parámetro "nombre", obtener todos los usuarios
    hurtos = await Hurto.find();
  }

  res.json({
    hurtos
  });
};


const hurtoPost = async (req, res = response) => {
  //captura atributos o parametros
  const body = req.body
  let mensaje = '';
  //instaciar el objeto
  // const{nombre,password,rol,estado}=req.query
  try {
    const hurto = new Hurto(body)

    //guardar objeto
    await hurto.save()
    console.log(hurto)
    mensaje = 'El registro se realizo correctamente'

  } catch (error) {
    if (error) {
      if (error.name === 'ValidationError') {
        mensaje = Object.values(error.errors).map(val => val.message)
      }
    }
  }

  res.json({
    msg: mensaje
  })

}

const hurtoPut = async (req, res = response) => {
  const { direccion, latitud, longitud, descripcion, fecha } = req.body;
  let mensaje = '';

  try {
    const hurto = await Hurto.findOneAndUpdate(
      { direccion: direccion},
      { direccion:direccion, latitud: latitud, longitud: longitud, descripcion: descripcion , fecha:fecha}
    );

    if (!hurto) {
      mensaje = 'El usuario no existe';
      return res.status(404).json({ mensaje });
    }

    mensaje = 'La modificación se efectuó correctamente';
    return res.status(200).json({ mensaje });
  } catch (error) {
    mensaje = 'Se presentaron problemas en la modificación';
    return res.status(500).json({ mensaje });
  }
};

const hurtoDelete = async (req, res = response) => {
  const { fecha } = req.body;
  console.log(fecha)
  let mensaje = '';

  try {
    const hurto = await Hurto.findOne({ fecha: fecha });
    if (hurto) {
      await Hurto.findOneAndDelete({ fecha: fecha });
      mensaje = 'La eliminacion fue exitosa';
    } else {
      mensaje = 'El hurto no existe';
    }
  } catch (error) {
    mensaje = 'Error al eliminar el hurto';
  }

  res.json({
    msg: mensaje
  });
};


module.exports = {
  hurtoGet,
  hurtoPost,
  hurtoPut,
  hurtoDelete
}
