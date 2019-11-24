<template>
        <v-layout align-center justify-center style="margin-top:100px">
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="error">
                <v-toolbar-title>Register Form</v-toolbar-title>
                <v-spacer></v-spacer>
               
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="nama" label="Name" type="text"></v-text-field>
                  <v-text-field v-model="tgl_lahir" label="Birhdate" type="date"></v-text-field>
                  <v-text-field v-model="email" label="Email" type="email"></v-text-field>
                  <v-text-field id="password" v-model="password" label="Password" type="password" name="password" required></v-text-field>
                  <v-text-field id="confirmPassword" v-model="confirmPassword" label="Confirm Password" name="confirmPassword" type="password" :rules="[comparePasswords]"></v-text-field>                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" type='submit' @click='registerUser'>REGISTER</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
</template>

<script>  
export default {
    data(){
      return {
        email:'',
        tgl_lahir: '',
        nama:'',
        password:'',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
       user () {
        return this.$store.getters.user
      }
    },
    methods: {
      registerUser(){
        this.$store.dispatch('register',{name:this.name,email:this.email,password:this.password}).then(()=>{
            this.$router.push('/');
        })
        
      }
    }
}
</script>