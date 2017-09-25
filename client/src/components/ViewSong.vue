<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <panel title="Informações da Música">
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



              <!-- parte 5 min: 39:00 -->






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
      </v-flex>

      <!-- embed YouTube -->
      <v-flex xs6 class="ml-3">
        <panel title="Vídeo da Música">
          <youtube :video-id="song.youtubeId" :player-width="500" :player-height="280"></youtube>
        </panel>
      </v-flex>
    </v-layout>

    <v-layout>
      <!-- Cifra -->
      <v-flex xs6 class="mt-3">
        <panel title="Cifra">
          <textarea readonly v-model="song.tab"></textarea>
        </panel>
      </v-flex>

      <!-- Letra -->
      <v-flex xs6 class="ml-3 mt-3">
        <panel title="Letra">
          <textarea readonly v-model="song.lyrics"></textarea>
        </panel>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import Panel from '@/components/Panel';
import SongsService from '@/services/SongsService';

export default {
  data () {
    return {
      song: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId;
    this.song = (await SongsService.show(songId)).data;
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

  textarea {
    width: 100%;
    font-family: monospace;
    border: none;
    height: 600px;
    border-style: none;
    border-color: transparent;
    overflow: auto;
    padding: 20px;
  }
</style>
