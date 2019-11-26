<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto" color="blue lighten-1" dark raised="4dp">
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="headline">Sparepart</v-card-title>
                    <v-card-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="headline">Towing</v-card-title>
                    <v-card-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
    import VueSession from 'vue-session'

    export default {
        methods: {
            getData() {

                var uri = this.$apiUrl + '/user/' + this.$session.get('id_user')
                this.$http.get(uri).then(response => {
                    this.user = response.data.data
                    this.currentUser = this.$session.get('username')
                    console.log(this.currentUser)
                });

            },
        },
        getAccInfo() {
            var uri = this.$apiUrl + '/login/' + this.$session.get('id_user')
            this.$http.get(uri).then(response => {
                this.user = response.data.message;
                this.currentRole = this.user[0].role;
            })
        },
        mounted() {
            this.getData();
            this.getAccInfo();
        }
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
