<template>
  <panel title="Músicas">
    <router-link :to="{name: 'songs-create'}" slot="action">
      <v-btn fab dark medium absolute right class="add-button blue darken-3">
        <v-icon>add</v-icon>
      </v-btn>
    </router-link>
    <div class="song" v-for="song in songs" :key="song.title">
      <v-layout>
        <v-flex xs6 class="pt-2">
          <div class="song-title">
            {{ song.title }}
          </div>
          <div class="song-artist">
            {{ song.artist }}
          </div>
          <div class="song-genre">
            {{ song.genre }}
          </div>

          <v-btn dark class="blue mt-4" @click="navigateTo({name: 'song', params: {songId: song.id}})">
            Ver Detalhes
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="album-image" :src="song.albumImageUrl">
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import Panel from '@/components/Panel';

export default {
  props: [
    'songs'
  ],
  methods: {
    navigateTo (route) {
      this.$router.push(route);
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
  }

  .add-button {
    margin-top: -5px;
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
