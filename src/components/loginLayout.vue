<template>
  <v-layout align-center justify-center style="margin-top:100px">
    <v-flex xs12 sm8 md4>
      <v-row>
        <h1> Welcome to PAW Bengkel </h1>
      </v-row>
      <v-card class="elevation-10 align-md-center">
        <v-toolbar dark color="error">
          <v-toolbar-title>PAW Bengkel Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="username" label="Username" type="text">
              <v-icon>mdi-heart</v-icon>
            </v-text-field>
            <v-text-field id="password" v-model="password" label="Password" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click='logIn'>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    data() {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      logIn() {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.push('/');
        })

      }
    }
  }
</script>