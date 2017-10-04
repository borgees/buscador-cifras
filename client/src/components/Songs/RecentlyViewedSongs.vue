<template>
  <panel title="Vistos Recentemente">
    <v-data-table :headers="headers" :items="histories" :pagination.sync="pagination">
      <template slot="items" scope="props">
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.artist }}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import Panel from '@/components/Panel';
import SongHystoryService from '@/services/SongHystoryService';
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
      histories: []
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
      this.histories = (await SongHystoryService.index({
        userId: this.user.id
      })).data
    }
  },
  components: {
    Panel
  }
}
</script>

<style>

</style>
