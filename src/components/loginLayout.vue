<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                 <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="Username"
                      id="username"
                      v-model="username"
                      type="username"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn @click="login()" type="submit">Login</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      login() {
      var url = this.$apiUrl + "/Auth";

      this.user = new FormData();
      this.user.append("email", this.form.email);
      this.user.append("password", this.form.password);

      this.$http.post(url, this.user).then(response => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "homeController" });
        } else {
          this.snackbar = true;
          this.text = "Invalid Username or Password!";
          this.color = "red";
          this.load = false;
        }
      });
    }
    }
  }
</script>