const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
};

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body);
      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON())
      })
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Este email ja esta sendo utilizado!"
      });
    }
  },

  async login (req, res) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: "info de login nao encontrada"
        })
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "info de login nao encontrada"
        })
      }

      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON())
      })
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Ocorreu um erro ao tentar entrar"
      });
    }
  }
}
