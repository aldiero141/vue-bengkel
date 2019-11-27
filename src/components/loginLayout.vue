<template>
  <v-img src="https://img4.goodfon.com/original/1920x1080/3/8f/material-design-material-design-colors-abstract-wallpaper--1.jpg" aspect-ratio="2">
    <v-container color="white">
      <v-row>
        <v-col>
          <v-layout align-center justify-center style="margin-top:170px">
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="red darken-4">
                  <v-toolbar-title>Login to Atma Bengkel</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="username" label="Username" type="text" required></v-text-field>
                    <v-text-field id="password" v-model="password" label="Password" type="password" name="password"
                      required>
                    </v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-text>
                  Don't have an account yet? <a href="/register">Register here</a>
                </v-card-text>
                <!-- <v-form>
          <a>Dont have an account yet? Register here</a>
        </v-form> -->
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
        </v-col>
      </v-row>
    </v-container>
    <v-footer padless :inset="footer.inset" app absolute>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 text-left">
          ©{{ new Date().getFullYear() }} — Created with <v-icon>mdi-heart</v-icon> by Kelompok 6 PAW™ — Raditya Dimas
          Bagus Santoso 9234 — Alexander Rivelino Aldo Aldiero 9395 — Yanuarius Hermawan 9454 — Alisha Aileen 9457
        </v-card-text>
      </v-card>
    </v-footer>
  </v-img>
</template>


<script>
  import VueSession from 'vue-session'
  export default {
    data() {
      return {
        footer: {
          inset: false,
        },
        username: '',
        password: '',
        snackbar: false,
        color: null,
        text: ''
      }
    },
    methods: {
      // onSignup () {
      //   this.$store.dispatch('signUserUp', {username: this.username, password: this.password})
      // },
      /*      login() {
              this.user = new FormData();
              this.user.append('username', this.username);
              this.user.append('password', this.password);

              var uri = this.$apiUrl + '/user/login';
              this.load = true;
              this.$http.post(uri, this.user).then(response => {
                if (response.data.error == true) {
                  console.log(response.data.error);
                  this.alert = true; //mengaktifkan snackbar
                  this.color = 'red';
                  this.type = 'error' //memberi warna snackbar
                  this.text = response.data.message; //memasukkan pesan ke snackbar
                  this.load = false;

                } else {
                  console.log(response.data.error);
                  this.alert = true; //mengaktifkan snackbar
                  this.color = 'green'; //memberi warna snackbar
                  this.text = 'SUCCESS';
                  this.type = 'success' //memasukkan pesan ke snackbar
                  this.load = false;
                  this.$session.start();
                  this.$session.set('username', this.user.username);
                  this.$session.set('id_user', this.user.id_user);
                  console.log(this.user.username);
                  this.$router.push({
                    name: "HomeController"
                  });

                }
              }).catch(error => {
                console.log(error);
                this.errors = error
                this.alert = true;
                this.text = 'Something Went Wrong';
                this.color = 'red';
                this.load = false;
                this.type = 'error'
              })
            },*/

      login() {
        var url = this.$apiUrl + "/Auth";

        this.user = new FormData();
        this.user.append("username", this.username);
        this.user.append("password", this.password);

        this.$http.post(url, this.user).then(response => {
          // console.log("sudah bisa post")
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id_user", response.data.id_user);
            console.log(localStorage.id_user)
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