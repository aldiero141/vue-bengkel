<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" color="white" width="1000px">
          <v-row>
            <v-col class="ma-8 my-2" md="2">
              <v-avatar size="200">
                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="John">
              </v-avatar>
            </v-col>
            <v-col class="ma-10 my-1" v-for="profile in profiles" :key="profile.id_user">
              <v-card-title>
                <h2>My Profile</h2>
              </v-card-title>
              <v-card-title>
                <h3>{{profile.username}}</h3>
              </v-card-title>
              <v-card-subtitle>
                <h4>{{profile.email}}</h4>
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-footer>
            <v-row>
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <v-col v-for="profile in profiles" :key="profile.id_user">
                <v-spacer></v-spacer>
                <v-btn class="ma-2" depressed dark rounded style="text-transform: none !important;"
                  color="blue accent-3" @click="editHandler(profile)">
                  <v-icon size="18" class="mr-2">mdi-account-edit</v-icon>Edit Profile
                </v-btn>
              </v-col>
            </v-row>
          </v-footer>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="mx-auto" color="white" width="1000px">
          <v-row>
            <v-col class="ma-8 my-2" cols="11">
              <v-card-title>
                <h2>User Info</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-col v-for="profile in profiles" :key="profile.id_user">
                <v-card-title>Name</v-card-title>
                <v-card-subtitle>{{ profile.nama }}</v-card-subtitle>

                <v-card-title>Username</v-card-title>
                <v-card-subtitle>{{ profile.username }}</v-card-subtitle>
                <v-card-title>Email</v-card-title>
                <v-card-subtitle>{{ profile.email }}</v-card-subtitle>
                <v-card-title>Date of Birth</v-card-title>
                <v-card-subtitle>{{ profile.tgl_lahir }}</v-card-subtitle>
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" v-model="form.name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Username" v-model="form.username" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="form.email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Date of Birth" v-model="form.dateofbirth" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        keyword: "",
        profiles: [],
        snackbar: false,
        color: null,
        text: "",
        load: false,
        form: {
          name: "",
          username: "",
          email: "",
          dateofbirth: ""
        },
        profile: new FormData(),
        typeInput: "new",
        errors: "",
        updatedId: ""
      };
    },
    methods: {
      getData() {
        var uri = this.$apiUrl + "/user/9";
        this.$http.get(uri).then(response => {
          this.profiles = response.data.message;
        });
      },
      sendData() {
        this.profile.append("name", this.form.name);
        this.profile.append("username", this.form.username);
        this.profile.append("email", this.form.email);
        this.profile.append("tgl_lahir", this.form.dateofbirth);
        var uri = this.$apiUrl + "/user";
        this.load = true;
        this.$http
          .post(uri, this.profile)
          .then(response => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = "green"; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackba
            this.load = false;
            this.dialog = false;
            this.getData(); //mengambil data profile
            this.resetForm();
          })
          .catch(error => {
            this.errors = error;
            this.snackbar = true;
            this.text = "Try Again";
            this.color = "red";
            this.load = false;
          });
      },
      updateData() {
        this.profile.append("nama", this.form.name);
        this.profile.append("username", this.form.username);
        this.profile.append("email", this.form.email);
        this.profile.append("tgl_lahir", this.form.dateofbirth);
        var uri = this.$apiUrl + "/user/" + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.profile)
          .then(response => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = "green"; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackbar

            this.load = false;
            this.dialog = false;
            this.getData(); //mengambil data profile
            this.resetForm();
            this.typeInput = "new";
          })
          .catch(error => {
            this.errors = error;
            this.snackbar = true;
            this.text = "Try Again";
            this.color = "red";
            this.load = false;
            this.typeInput = "new";
          });
      },
      editHandler(profile) {
        this.typeInput = "edit";
        this.dialog = true;
        this.form.name = profile.nama;
        this.form.username = profile.username;
        this.form.email = profile.email;
        this.form.dateofbirth = profile.tgl_lahir;
        (this.updatedId = profile.id_user);
      },
      deleteData(deleteId) {
        var uri = this.$apiUrl + "/user/" + deleteId;
        this.$http
          .delete(uri)
          .then(response => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = "green";
            this.deleteDialog = false;
            this.getData();
          })
          .catch(error => {
            this.errors = error;
            this.snackbar = true;
            this.text = "Try Again";
            this.color = "red";
          });
      },
      setForm() {
        if (this.typeInput === "new") {
          this.sendData();
        } else {
          console.log("dddd");
          this.updateData();
        }
      },
      resetForm() {
        this.form = {
          name: "",
          username: "",
          email: "",
          dateofbirth: ""
        }
      }
    },
    mounted() {
      this.getData();
    }
  };
</script>