<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>

      <!-- embed YouTube -->
      <v-flex xs6 class="ml-3">
        <panel title="Vídeo da Música" class="music-info">
          <youtube :video-id="song.youtubeId" :player-width="400" :player-height="280"></youtube>
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
import SongMetadata from './SongMetadata';
import SongsService from '@/services/SongsService';
import SongHystoryService from '@/services/SongHystoryService';
import {mapState} from 'vuex';

export default {
  data () {
    return {
      song: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const songId = this.route.params.songId;
    this.song = (await SongsService.show(songId)).data;

    if (this.isUserLoggedIn) {
      SongHystoryService.post({
        SongId: songId
      })
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route);
    }
  },
  components: {
    Panel,
    SongMetadata
  }
}
</script>

<style scoped

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
