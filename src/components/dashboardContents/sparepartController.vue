<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto justify-center" color="blue accent-3" dark>
                    <v-row>
                        <v-col>
                            <v-card-title class="justify-center">
                                <h2 class="text-md-center">Sparepart</h2>
                            </v-card-title>
                            <v-card-subtitle class="justify-center">
                                <h3 class="text-md-center">Sparepart Purchases History</h3>
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
                                <v-btn depressed dark rounded style="text-transform: none !important;"
                                    color="red darken-4" @click="dialog = true">
                                    <v-icon size="18" class="mr-2">mdi-wrench</v-icon>Buy New Sparepart
                                </v-btn>
                            </v-flex>
                            <v-flex xs6 class="text-right">
                                <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                                </v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-data-table :headers="headers" :items="spareparts" :search="keyword" :loading="load">
                            <template v-slot:body="{ items }">
                                <tbody>
                                    <tr v-for="(item,index) in items" :key="item.id_transaksi">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.nama }}</td>
                                        <td>{{ item.harga }}</td>
                                        <td>{{ item.jumlah_beli }}</td>
                                        <td>{{ item.total_harga }}</td>
                                        <td class="text-center">
                                            <v-btn icon color="indigo" light @click="editHandler(item)">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn icon color="error" light @click="deleteData(item.id_transaksi)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </template> </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title> <span class="headline">Sparepart Data</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <!-- <v-col cols="12">
                                <v-text-field label="Sparepart*" v-model="form.sparepart" required>
                                </v-text-field>
                            </v-col> -->
                            <v-col class="d-flex" cols="12" sm="12">
                                <v-select :items="available_spareparts" label="Choose Sparepart" outlined
                                    v-model="form.sparepart" item-text="nama_sparepart"></v-select>
                            </v-col>
                            <!-- <v-col cols="12">
                                <v-text-field label="Price*" v-model="form.price" required></v-text-field>
                            </v-col> -->
                            <v-col cols="12">
                                <v-text-field label="Amount*" v-model="form.amount"></v-text-field>
                            </v-col>
                            <!-- <v-col cols="12">
                                <v-text-field label="Total Price" v-model="form.totalPrice"></v-text-field>
                            </v-col> -->
                        </v-row>
                    </v-container> <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                dialog: false,
                id_user: '',
                keyword: '',
                headers: [{
                    text: 'No',
                    value: 'no',
                }, {
                    text: 'Sparepart',
                    value: 'nama',
                }, {
                    text: 'Price (Rp)',
                    value: 'harga'
                }, {
                    text: 'Amount',
                    value: 'jumlah__beli'
                }, {
                    text: 'Total Price (Rp)',
                    value: 'total_harga'
                }, {
                    text: 'Action',
                    value: null
                }, ],
                spareparts: [],
                available_spareparts: [],
                snackbar: false,
                color: null,
                text: '',
                load: false,
                form: {
                    sparepart: '',
                    price: 0,
                    amount: '',
                    totalPrice: 0
                },
                sparepart: new FormData,
                typeInput: 'new',
                errors: '',
                updatedId: '',
            }
        },
        methods: {
            getData() {

                var uri = this.$apiUrl + '/transaksi'
                var uri_available_sparepart = this.$apiUrl + '/sparepart'

                this.$http.get(uri).then(response => {
                    this.spareparts = response.data.message
                })

                this.$http.get(uri_available_sparepart).then(response => {
                    this.available_spareparts = response.data.message
                })

            },

            getAccInfo() {
                var uri = this.$apiUrl + '/login/' + this.$session.get('id_user')
                this.$http.get(uri).then(response => {
                    this.user = response.data.message;
                    this.currentRole = this.user[0].role;
                })
            },

            sendData() {
                var selected_item = this.form.sparepart

                this.available_spareparts.forEach(e => {
                    if (e.nama_sparepart == selected_item) {
                        this.form.price = parseInt(e.harga_sparepart)
                    }
                });

                this.form.totalPrice = parseInt(this.form.amount) * this.form.price;

                this.sparepart.append('nama', this.form.sparepart);
                this.sparepart.append('jumlah_beli', this.form.amount);
                this.sparepart.append('harga', this.form.price);
                this.sparepart.append('total_harga', this.form.totalPrice);
                var uri = this.$apiUrl + '/transaksi'
                this.load = true
                this.$http.post(uri, this.sparepart).then(response => {
                    this.snackbar =
                        true; //mengaktifkan snackbar               
                    this.color = 'green'; //memberi warna snackbar               
                    this.text = response.data.message; //memasukkan pesan ke snackbar               
                    this.load = false;
                    this.dialog = false
                    this.getData(); //mengambil data sparepart               
                    this.resetForm();
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            },
            updateData() {
                var selected_item = this.form.sparepart

                this.available_spareparts.forEach(e => {
                    if (e.nama_sparepart == selected_item) {
                        this.form.price = parseInt(e.harga_sparepart)
                    }
                });

                this.form.totalPrice = parseInt(this.form.amount) * this.form.price;

                this.sparepart.append('nama', this.form.sparepart);
                this.sparepart.append('jumlah_beli', this.form.amount);
                this.sparepart.append('harga', this.form.price);
                this.sparepart.append('total_harga', this.form.totalPrice);
                var uri = this.$apiUrl + '/transaksi/' + this.updatedId;
                this.load = true
                this.$http.post(uri, this.sparepart).then(response => {
                    this.snackbar = true; //mengaktifkan snackbar             
                    this.color = 'green'; //memberi warna snackbar  
                    this.text = response.data.message; //memasukkan pesan ke snackbar 
                    this.load = false;
                    this.dialog = false
                    this.getData(); //mengambil data sparepart   
                    this.resetForm();
                    this.typeInput = 'new';
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                    this.typeInput = 'new';
                })
            },
            editHandler(item) {
                this.typeInput = 'edit';
                this.dialog = true;
                this.form.sparepart = item.nama;
                this.form.price = item.harga;
                this.form.amount = item.jumlah_beli;
                this.form.totalPrice = item.total_harga,
                    (this.updatedId = item.id_transaksi);
            },
            deleteData(deleteId) { //mengahapus data      
                var uri = this.$apiUrl + '/transaksi/' + deleteId; //data dihapus berdasarkan id 

                this.$http.delete(uri).then(response => {
                    this.snackbar = true;
                    this.text = response.data.message;
                    this.color = 'green'
                    this.deleteDialog = false;
                    this.getData();
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                })
            },
            setForm() {
                if (this.typeInput === 'new') {
                    this.sendData()
                } else {
                    console.log("dddd")
                    this.updateData()
                }
            },
            resetForm() {
                this.form = {
                    sparepart: '',
                    price: '',
                    amount: '',
                    totalPrice: ''
                }
            }
        },
        mounted() {
            this.getData();
            if (localStorage.id_user) {
                this.id_user = localStorage.id_user;
            }
        },
    }
</script>