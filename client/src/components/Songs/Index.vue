<template>
  <v-layout>
    <v-flex xs-6 v-if="isUserLoggedIn">
      <songs-bookmarks />
      <!-- <recently-viewed-songs class="mt-3" /> -->
    </v-flex>
    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }" class="ml-3">
      <panel title="Buscar Música" class="mb-3">
        <div class="search-box">
          <v-text-field v-model="search" label="Procure pelo Nome da Música, Artista, Album ou Gênero"></v-text-field>
        </div>
      </panel>
      <songs-panel :songs="songs" />
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel';
import SongsService from '@/services/SongsService';
// import BookmarksService from '@/services/BookmarksService';
import {mapState} from 'vuex';
import _ from "lodash";

import SongsPanel from './SongsPanel';
import SongsBookmarks from './SongsBookmarks';
import RecentlyViewedSongs from './RecentlyViewedSongs';

export default {
  data () {
    return {
      songs: null,
      search: ""
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route);
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = { name: "songs" };
      if (this.search !== "") {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route);
    }, 500),
    '$route.query.search': {
      imediate: true,
      async handler (value) {
        this.search = value;
        this.songs = (await SongsService.index(value)).data;
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    this.songs = (await SongsService.index()).data;
  },
  components: {
    Panel,
    SongsPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  }
}
</script>

<style scoped>

  .search-box {
    padding: 0 20% !important;
  }

</style>
