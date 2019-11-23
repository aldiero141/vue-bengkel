<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Sparepart</h2>
                <h3 class="text-md-center">Sparepart Purchase History</h3>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn 
                            depressed 
                            dark
                            rounded 
                            style="text-transform: none !important;" 
                            color="red accent-3"
                            @click="dialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-wrench</v-icon>Buy New Sparepart
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
						<v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
						</v-text-field>
					</v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="spareparts" :search="keyword" :loading="load"> <template
                        v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.sparepart }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.amount }}</td>
                                <td>{{ item.totalPrice }}</td>
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
                    </template> </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title> <span class="headline">Sparepart Data</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Sparepart*" v-model="form.sparepart" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Price*" v-model="form.price" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Amount" v-model="form.amount"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Total Price" v-model="form.totalPrice"></v-text-field>
                            </v-col>
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
                keyword: '',
                headers: [{
                    text: 'No.',
                    value: 'no',
                }, {
                    text: 'Sparepart',
                    value: 'sparepart',
                }, {
                    text: 'Price (Rp)',
                    value: 'price'
                }, {
                    text: 'Amount',
                    value: 'amount'
                }, {
                    text: 'Total Price (Rp)',
                    value: 'totalPrice'
                }, {
                    text: 'Action',
                    value: null
                }, ],
                spareparts: [],
                snackbar: false,
                color: null,
                text: '',
                load: false,
                form: {
                    sparepart: '',
                    price: '',
                    amount: '',
                    totalPrice: ''
                },
                sparepart: new FormData,
                typeInput: 'new',
                errors: '',
                updatedId: '',
            }
        },
        methods: {
            getData() {
                var uri = this.$apiUrl + '/sparepart'
                this.$http.get(uri).then(response => {
                    this.spareparts = response.data.message
                })
            },
            sendData() {
                this.sparepart.append('sparepart', this.form.sparepart);
                this.sparepart.append('price', this.form.price);
                this.sparepart.append('amount', this.form.amount);
                this.sparepart.append('totalPrice', this.form.totalPrice);
                var uri = this.$apiUrl + '/sparepart'
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
                this.sparepart.append('sparepart', this.form.sparepart);
                this.sparepart.append('price', this.form.price);
                this.sparepart.append('amount', this.form.amount);
                this.sparepart.append('totalPrice', this.form.totalPrice);
                var uri = this.$apiUrl + '/sparepart/' + this.updatedId;
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
                this.form.sparepart = item.sparepart;
                this.form.price = item.price;
                this.form.amount = item.amount;
                // this.form.totalPrice = '',
                this.updatedId = item.id
            },
            deleteData(deleteId) { //mengahapus data      
                var uri = this.$apiUrl + '/sparepart/' + deleteId; //data dihapus berdasarkan id 

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
        },
    }
</script>