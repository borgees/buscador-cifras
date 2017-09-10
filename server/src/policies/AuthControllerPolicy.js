const Joi = require('joi');

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }

    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: "Formato de email invalido"
          })
          break
        case 'password':
          res.status(400).send({
            error: "Senha deve conter apenas letras (minusculas ou maiusculas) e numeros e comprimento entre 8 e 32 caracteres"
          })
          break
        default:
          res.status(400).send({
            error: "Informacoes de cadastro invalidas"
          })
      }
    } else {
      next()
    }
  }
}
