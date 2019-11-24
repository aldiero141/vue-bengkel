<template>
  <v-layout align-center justify-center style="margin-top:170px">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="error">
          <v-toolbar-title>Login Form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="username" label="Username" type="text" required></v-text-field>
            <v-text-field id="password" v-model="password" label="Password" type="password" name="password" required>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" type='submit' @click='login()'>LOGIN</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>



<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        snackbar: false,
        color: null,
        text: ''
      }
    },
    methods: {
      // onSignup () {
      //   this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      // },
      login() {
        var url = this.$apiUrl + "/Auth";

        this.user = new FormData();
        this.user.append("username", this.username);
        this.user.append("password", this.password);

        this.$http.post(url, this.user).then(response => {
          // console.log("sudah bisa post")
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            this.$router.push({
              name: "HomeController"
            });
          } else {
            this.snackbar = true;
            console.log("gagal post")
            this.text = "Invalid Username or Password!";
            this.color = "red";
            this.load = false;
          }
        });
      }
    }
  }
</script>