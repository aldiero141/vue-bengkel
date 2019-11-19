<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <h2 class="text-md-center">Services</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              style="text-transform: none !important;"
              color="green accent-3"
              @click="dialog = true"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Add New Service
            </v-btn>
          </v-flex>
          <v-flex xs6 class="text-right">
            <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table :headers="headers" :items="services" :search="keyword" :loading="load">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item,index) in items" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.serviceType}}</td>
                <td>{{ item.licenseNumber }}</td>
                <td>{{ item.message }}</td>
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
          <span class="headline">Service</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name*" v-model="form.date" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Address*" v-model="form.serviceType" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Phone Number*" v-model="form.licenseNumber" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Phone Number*" v-model="form.message" required></v-text-field>
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
          text: "Date ",
          value: "date"
        },
        {
          text: "Service Type",
          value: "serviceType"
        },
        {
          text: "License Number",
          value: "licenseNumber"
        },
        {
          text: "Message",
          value: "message"
        }, 
        {
          text: "Action",
          value: null
        }
      ],
      services: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        name: "",
        address: "",
        phoneNumber: ""
      },
      service: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl + "/service";
      this.$http.get(uri).then(response => {
        this.services = response.data.message;
      });
    },
    sendData() {

      this.service.append("date", this.form.date);
      this.service.append("serviceType", this.form.serviceType);
      this.service.append("licenseNumber", this.form.licenseNumber);
      this.service.append("message",message);
      var uri = this.$apiUrl + "/service";
      this.load = true;
      this.$http
        .post(uri, this.service)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan ke snackba
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil data service
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
      this.service.append("date", this.form.date);
      this.service.append("serviceType", this.form.serviceType);
      this.service.append("licenseNumber", this.form.licenseNumber);
      this.service.append("message", this.form.message);
      var uri = this.$apiUrl + "/service/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.service)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan ke snackba

          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil data service
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
      this.form.serviceType = item.serviceType;
      this.form.licenseNumber = item.licenseNumber;
      this.form.message = item.message;
      (this.updatedId = item.id);
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl + "/service/" + deleteId;
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
        serviceType: "",
        licenseNumber: "",
        message: "",
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>