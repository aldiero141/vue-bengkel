<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto justify-center" color="deep-orange lighten-1" dark>
          <v-row>
            <v-col>
              <v-card-title class="justify-center">
                <h2 class="text-md-center">Towing</h2>
              </v-card-title>
              <v-card-subtitle class="justify-center">
                <h3 class="text-md-center">Towing Services History</h3>
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-md mb-0>
            <v-layout row wrap style="margin:10px">
              <v-flex xs6>
                <v-btn depressed dark rounded style="text-transform: none !important;" color="blue accent-3"
                  @click="dialog = true">
                  <v-icon size="18" class="mr-2">mdi-towing</v-icon>Tow Other Vehicle
                </v-btn>
              </v-flex>
              <v-flex xs6 class="text-right">
                <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="headers" :items="towings" :search="keyword" :loading="load">
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item,index) in items" :key="item.id_derek">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.merk }}</td>
                    <td>{{ item.warna }}</td>
                    <td>{{ item.no_plat_derek }}</td>
                    <td>{{ item.lokasi }}</td>
                    <td class="text-center">
                      <v-btn icon color="indigo" light @click="editHandler(item)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="error" light @click="deleteData(item.id_derek)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Towing</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Brand*" v-model="form.merk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Color*" v-model="form.color" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="License Number*" v-model="form.license_number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Pick Up Location*" v-model="form.pickup_location" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        keyword: "",
        headers: [{
            text: "No",
            value: "no"
          },
          {
            text: "Brand",
            value: "merk"
          },
          {
            text: "Color",
            value: "color"
          },
          {
            text: "License Number",
            value: "license_number"
          },
          {
            text: "Pick Up Location",
            value: "pickup_location"
          },
          {
            text: "Action",
            value: null
          }
        ],
        towings: [],
        snackbar: false,
        color: null,
        text: "",
        load: false,
        form: {
          merk: "",
          color: "",
          license_number: "",
          pickup_location: ""
        },
        towing: new FormData(),
        typeInput: "new",
        errors: "",
        updatedId: ""
      };
    },
    methods: {
      getData() {
        var uri = this.$apiUrl + "/derek";
        this.$http.get(uri).then(response => {
          this.towings = response.data.message;
        });
      },
      sendData() {
        this.towing.append("merk", this.form.merk);
        this.towing.append("warna", this.form.color);
        this.towing.append("no_plat_derek", this.form.license_number);
        this.towing.append("lokasi", this.form.pickup_location);
        var uri = this.$apiUrl + "/derek";
        this.load = true;
        this.$http
          .post(uri, this.towing)
          .then(response => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = "green"; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackba
            this.load = false;
            this.dialog = false;
            this.getData(); //mengambil data towing
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
        this.towing.append("merk", this.form.merk);
        this.towing.append("warna", this.form.color);
        this.towing.append("no_plat_derek", this.form.license_number);
        this.towing.append("lokasi", this.form.pickup_location);
        var uri = this.$apiUrl + "/derek/" + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.towing)
          .then(response => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = "green"; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackbar

            this.load = false;
            this.dialog = false;
            this.getData(); //mengambil data towing
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
      editHandler(item) {
        this.typeInput = "edit";
        this.dialog = true;
        this.form.merk = item.merk;
        this.form.color = item.warna;
        this.form.license_number = item.no_plat_derek;
        this.form.pickup_location = item.lokasi;
        (this.updatedId = item.id_derek);
      },
      deleteData(deleteId) {
        var uri = this.$apiUrl + "/derek/" + deleteId;
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
          merk: "",
          color: "",
          license_number: "",
          pickup_location: ""
        }
      }
    },
    mounted() {
      this.getData();
    }
  };
</script>