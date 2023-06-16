const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{hurtoGet, hurtoPost, hurtoPut, hurtoDelete}=require('../controllers/hurto')
route.get('/', hurtoGet)
route.post('/',hurtoPost )
route.put('/',hurtoPut )
route.put('/',hurtoDelete )
route.delete('/', hurtoDelete)
module.exports = route


