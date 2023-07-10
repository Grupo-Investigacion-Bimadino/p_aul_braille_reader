const express = require('express');
const braille = require('braille');
const fs = require('fs');
var router = express.Router();


router.get('/welcome', (req, res) => {
     res.send('hola mundo');
})

router.post('/hasConvert', (req, res) => {
     const { text } = req.body;
     try {
          const convertToBraille = braille.toBraille(text);
          return res.status(200).json({
               braille: convertToBraille,
               message: 'Texto Convertido Correctamente'
          });
     } catch (error) {
          return res.status(500).json({
               error: error.message
          });
     }
});


//Registra los usuarios en el json
router.post('/register', (req, res) => {
     const { name, lastname, nickname, email, password } = req.body;
     const nuevoUsuario = { name, lastname, nickname, email, password };

     let usuarios = [];
     try {
          const data = fs.readFileSync('users.json');
          usuarios = JSON.parse(data);
          usuarios.push(nuevoUsuario);
          fs.writeFileSync('users.json', JSON.stringify(usuarios));
          res.send('¡Registro exitoso!');
     } catch (error) {
          console.log(error.message);
     }
})

//Busqueda de usuario en json
router.post('/searchUsers', (req, res) => {
     const { email, password } = req.body;
     let usuarios = [];
     try {
          const data = fs.readFileSync('users.json');
          let usuarios = JSON.parse(data);
          const userByEmailPass = usuarios.find(usuario => usuario.email === email && usuario.password === password);
          console.log(userByEmailPass);
          if (userByEmailPass != undefined) {
               return res.status(200).json({
                    message: 'Usuario Encontrado',
                    braille: userByEmailPass,
               });
          }else {
               return res.status(200).json({
                    message: 'Datos invalidos'
               });
          }
     } catch (error) {
          console.log(error.message);
     }
})



module.exports = router;
