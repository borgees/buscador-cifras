const {Song} = require('../models');

module.exports = {

  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      });
      res.send(songs);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Ocorreu um erro ao tentar buscar as músicas"
      });
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId);
      res.send(song);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Ocorreu um erro ao tentar buscar a música"
      });
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body);
      res.send(song);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Ocorreu um erro ao tentar criar a músicas"
      });
    }
  }
}
