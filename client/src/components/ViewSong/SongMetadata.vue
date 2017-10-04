<template>
  <panel title="Informações da Música" class="music-info">
    <v-layout>
      <!-- Dados -->
      <v-flex xs6 class="mt-4">
        <div class="mt-4 song-title">
          {{ song.title }}
        </div>
        <div class="song-artist">
          {{ song.artist }}
        </div>
        <div class="song-genre">
          {{ song.genre }}
        </div>
        <v-btn dark class="blue mt-3" @click="navigateTo({name: 'song-edit', params: {songId: song.id}})">Editar Música</v-btn>

        <v-btn v-if="isUserLoggedIn && !bookmark" dark class="blue mt-3" @click="setAsBookmark">Favoritar</v-btn>
        <v-btn v-if="isUserLoggedIn && bookmark" dark class="blue mt-3" @click="unBookmark">Desfavoritar</v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl">
        <br>
        <div>
          {{song.album}}
        </div>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import Panel from '../../components/Panel';
import {mapState} from 'vuex';
import BookmarksService from '@/services/BookmarksService';
// import SongsService from '@/services/SongsService';

export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route);
    },
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id);
        this.bookmark = null;
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
  }

  .music-info {
    height: 400px;
  }

  .song-title {
    font-size: 30px;
  }

  .song-artist {
    font-size: 24px;
  }

  .song-genre {
    font-size: 18px;
  }

  .album-image {
    width: 70%;
    margin: 0 auto;
  }
</style>
