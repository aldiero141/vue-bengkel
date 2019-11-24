<template>
  <v-layout align-center justify-center style="margin-top:50px">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="error">
          <v-toolbar-title>Register to Atma Bengkel</v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="nama" label="Name" type="text"></v-text-field>
            <v-text-field v-model="username" label="Username" type="text"></v-text-field>
            <v-text-field v-model="tgl_lahir" label="Birhdate" type="date"></v-text-field>
            <v-text-field v-model="email" label="Email" type="email"></v-text-field>
            <v-text-field id="password" v-model="password" label="Password" type="password" name="password" required>
            </v-text-field>
            <v-text-field id="confirmPassword" v-model="confirmPassword" label="Confirm Password" name="confirmPassword"
              type="password" :rules="[comparePasswords]"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text>
          Have an account? <a href="/">Login here</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" type='submit' @click="registerUser()">REGISTER</v-btn>
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
        email: '',
        username: '',
        tgl_lahir: '',
        nama: '',
        password: '',
        confirmPassword: '',
        snackbar: false,
        color: null,
        text: ''
      }
    },
    computed: {
      comparePasswords() {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      }
    },
    methods: {
      registerUser() {
        this.user = new FormData();
        this.user.append('username', this.username);
        this.user.append('email', this.email);
        this.user.append('tgl_lahir', this.tgl_lahir);
        this.user.append('nama', this.nama);
        this.user.append('password', this.password);
        var url = this.$apiUrl + "/User"
        this.load = true
        this.$http.post(url, this.user).then(response => {
          this.snackbar = true; //mengaktifkan snackbar               
          this.color = 'green'; //memberi warna snackbar               
          this.text = 'Succeed Register, Check your email inbox for the verification code!'; //memasukkan pesan ke snackbar               
          this.load = false;
          this.dialog = false;
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
        })
      }
    }
  }
</script>