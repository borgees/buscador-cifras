<template>


  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Cadastro">
        <form name="register-form" autocomplete="off">
          <v-text-field name="email" type="email" v-model="email" label="Email: "></v-text-field>
          <br>
          <v-text-field name="password" type="password" v-model="password" label="Senha: "></v-text-field>
          <br>
        </form>
        <div class="danger-alert" v-html="error" />
        <v-btn dark class="blue" @click="register">Cadastrar</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from "@/services/AuthService";
import Panel from '@/components/Panel';

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
        const response = await AuthService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: "songs"
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
