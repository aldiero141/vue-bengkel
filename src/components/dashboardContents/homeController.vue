<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto" color="blue accent-3" dark>
                    <v-card-title class="headline">
                        <h2>Welcome !</h2>
                    </v-card-title>

                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="headline">Service</v-card-title>
                    <v-card-subtitle>
                        Atma Bengkel provides you an ease of service. When other place require you to visit them
                        when you're in your busy hours, we can take your bike on your place and bring it to Atma
                        Bengkel. Simply click the "SERVICE" button on the navigation bar and add new service. 
                        Fill the form and you're done!<br/>
                        You can also edit or cancel your service plan by clicking the action button. You can pick 
                        up your vehicle after the service is done. Check out our location on the bottom of this 
                        website!
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="headline">Sparepart</v-card-title>
                    <v-card-subtitle>
                        Need a new sparepart? We have the finest spareparts waiting to be bought by you! 
                        You can visit our store (location on map below) or order it via this website!<br/>
                        Push that "SPAREPART" button on navigation bar and Choose "Buy new sparepart". Fill
                        the form and save it. The payment will be done when you take your goods. If you ever
                        change your mind, you can edit or cancel your purchase by clicking on the action button.<br/>
                        So, what do you wanna buy?
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="headline">Towing</v-card-title>
                    <v-card-subtitle>
                        Ever been in a sh*tty situation where you got stuck in the middle of the road and your
                        motorcycle suddenly not working?<br/>
                        Worry not! 'Cause you can count on us everytime that happens.<br/>
                        On the navigation bar, click "TOWING" and let us know where you are and what your vehicle 
                        looks like. We will immediately pick your vehicle up to our place. You can also edit and 
                        cancel it.<br/>
                        Let us know when you're in need!
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card class="geolocation">
                    <v-card-title class="headline">Find Us</v-card-title>
                    <div>
                        <div class="mapouter">
                            <div class="gmap_canvas">
                                <iframe id="gmap_canavas" width="100%" height="100%" frameborder="0" style="border:0"
                                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ2bND4e9Zei4RZTdsKR3y3kg&key=AIzaSyDwqex9g59_k5Dpkets81KieRPpKSxboqg"
                                    allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                snackbar: false,
                color: null,
                text: '',
                id_user: '',
                dialog: false,
                keyword: "",
                profiles: [],
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
            }
        },
        methods: {
            getData() {
                var uri = this.$apiUrl + '/user/' + this.id_user
                this.$http.get(uri).then(response => {
                    this.user = response.data.data
                    this.currentUser = this.id_user
                    console.log(this.currentUser)
                });

            },
        },
        mounted() {
            this.getData();
            //this.getAccInfo();
            if (localStorage.username) {
                this.username = localStorage.username;
            }
        },
    }
</script>
<style>
    .mapouter {
        text-align: right;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .gmap_canvas {
        /* overflow: scroll; */
        background: none !important;
        height: 100%;
        width: 100%;
    }

    .geolocation {
        height: 500px;
        margin-bottom: 70px;
    }
</style>