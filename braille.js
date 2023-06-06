const express = require('express');
const braille = require('braille');
var router = express.Router();


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



module.exports = router;
