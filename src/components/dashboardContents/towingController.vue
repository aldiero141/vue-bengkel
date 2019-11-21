<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <h2 class="text-md-center">Towing</h2>
        <h3 class="text-md-center">Towing Service History</h3>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              style="text-transform: none !important;"
              color="blue accent-3"
              @click="dialog = true"
            >
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
              <tr v-for="(item,index) in items" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.merk }}</td>
                <td>{{ item.color }}</td>
                <td>{{ item.license_number }}</td>
                <td>{{ item.pickup_location }}</td>
                <td class="text-center">
                  <v-btn icon color="indigo" light @click="editHandler(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="error" light @click="deleteData(item.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Towing</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Date*" v-model="form.date" required></v-text-field>
              </v-col>
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
      headers: [
        {
          text: "No",
          value: "no"
        },
        {
          text: "Date",
          value: "date"
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
        name: "",
        address: "",
        phoneNumber: ""
      },
      towing: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl + "/towing";
      this.$http.get(uri).then(response => {
        this.towings = response.data.message;
      });
    },
    sendData() {
      var created_at = new Date();
      var dd = String(created_at.getDate()).padStart(2, '0');
      var mm = String(created_at.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = created_at.getFullYear();
      created_at = yyyy + '/' + mm + '/' + dd;

      this.towing.append("date", this.form.date);
      this.towing.append("merk", this.form.merk);
      this.towing.append("color", this.form.color);
      this.towing.append("license_number",license_number);
      this.towing.append("pickup_location", this.form.pickup_location);
      var uri = this.$apiUrl + "/towing";
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
      this.towing.append("date", this.form.date);
      this.towing.append("merk", this.form.merk);
      this.towing.append("color", this.form.color);
      this.towing.append("license_number",license_number);
      this.towing.append("pickup_location", this.form.pickup_location);
      var uri = this.$apiUrl + "/towing/" + this.updatedId;
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
      this.form.date = item.date;
      this.form.merk = item.merk;
      this.form.color = item.color;
      this.form.license_number = item.license_number;
      this.form.pickup_location = item.pickup_location;
      (this.updatedId = item.id);
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl + "/towing/" + deleteId;
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
        date: "",
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