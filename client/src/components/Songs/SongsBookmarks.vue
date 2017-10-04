<template>
  <panel title="Favoritos">
    <v-data-table :headers="headers" :items="bookmarks" :pagination.sync="pagination">
      <template slot="items" scope="props">
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.artist }}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import Panel from '@/components/Panel';
import BookmarksService from '@/services/BookmarksService';
import {mapState} from 'vuex';

export default {
  data () {
    return {
      headers: [
        {
          text: "Titulo",
          value: "title"
        },
        {
          text: "Artista",
          value: "artist"
        }
      ],
      pagination: {
        sortBy: "createdAt",
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
  },
  components: {
    Panel
  }
}
</script>

<style>

</style>
