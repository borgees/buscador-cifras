<template>


  <v-layout column>
    <v-toolbar dark class="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="blue" dark>
          <v-toolbar-title>Cadastro</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-4 pb-4">
          <v-text-field name="email" type="email" v-model="email" label="Email: "></v-text-field>
          <br>
          <v-text-field name="password" type="password" v-model="password" label="Senha: "></v-text-field>
          <br>
          <div class="error" v-html="error" />
          <v-btn class="blue" @click="register">Cadastrar</v-btn>
        </div>

      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from "@/services/AuthService"

export default {
  data () {
    return {
      email: "",
      password: "",
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthService.register({
          email: this.email,
          password: this.password
        });
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
