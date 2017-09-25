<template>
  <v-layout>
    <v-flex xs5>
      <panel title="Dados da Música">
        <v-text-field required :rules="[required]" v-model="song.title" label="Título: "></v-text-field>
        <v-text-field required :rules="[required]" v-model="song.artist" label="Artista: "></v-text-field>
        <v-text-field required :rules="[required]" v-model="song.genre" label="Gênero: "></v-text-field>
        <v-text-field required :rules="[required]" v-model="song.album" label="Album: "></v-text-field>
        <v-text-field required :rules="[required]" v-model="song.albumImageUrl" label="URL da Imagem do Album: "></v-text-field>
        <v-text-field required :rules="[required]" v-model="song.youtubeId" label="Id do YouTube: "></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs7>
      <panel title="Letra e Cifra" class="ml-3">
        <v-text-field required :rules="[required]" multi-line v-model="song.lyrics" label="Letra: "></v-text-field>
        <v-text-field required :rules="[required]" multi-line v-model="song.tab" label="Cifra: "></v-text-field>
      </panel>

      <span class="danger-alert" v-if="error">
        <br>
        {{ error }}
        <br>
      </span>

      <v-btn dark class="blue mt-4" @click="create">Salvar Música</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel';
import SongsService from '@/services/SongsService';

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Campo Obrigatório!'
    }
  },
  methods: {
    async create () {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key]);
      if (!areAllFieldsFilledIn) {
        this.error = "  Por favor preencha todos os campos obrigatórios.  ";
        return;
      }
      try {
        await SongsService.post(this.song);
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err);
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style>

</style>
