const {
  Bookmark,
  Song
} = require('../models');

const _ = require('lodash');

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id;
      const {songId} = req.query;

      const where = {
        UserId: userId
      };
      if (songId) {
        where.SongId = songId;
      }

      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      }).map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({}, bookmark.Song, bookmark));

      res.send(bookmarks);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Ocorreu um erro ao tentar buscar suas músicas favoritas"
      });
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id;
      const {songId} = req.body;
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.send(400).send({
          error: "Você já adicionou essa música aos favoritos"
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Ocorreu um erro ao tentar salvar a música como favorita"
      });
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {bookmarkId} = req.params;
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      });
      if (!bookmark) {
        return res.status(403).send({
          error: "você não tem axesso a esse favorito"
        })
      }
      await bookmark.destroy();
      res.send(bookmark);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Ocorreu um erro ao tentar deletar a música de seus favoritos"
      });
    }
  }
}
