<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto" color="white" width="1000px">
                    <v-row>
                        <v-col md="3">
                            <v-avatar size="200">
                                <img src="https://i.imgur.com/VD09afj.jpg" alt="John">
                            </v-avatar>
                        </v-col>
                        <v-col md="8">
                            <v-card-title>
                                <h2>My Profile</h2>
                            </v-card-title>
                            <v-card-title>JohnDoe2020</v-card-title>
                            <v-card-subtitle>John@Mail.com</v-card-subtitle>
                        </v-col>
                    </v-row>
                    <v-footer>
                        <v-spacer/>
                        <v-btn depressed dark rounded style="text-transform: none !important;"
                            color="blue accent-3" @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil</v-icon>Edit Profile
                        </v-btn>
                        
                    </v-footer>
                            
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card class="mx-auto" color="white" width="1000px">
                    <v-row>
                        <v-col cols="10" offset-md="1">
                            <v-card-title><h2>User Info</h2></v-card-title>
                            <v-divider></v-divider>
                            <v-col>
                                <v-card-title>Name</v-card-title>
                                <v-card-subtitle>John Doe</v-card-subtitle>

                                <v-card-title>Username</v-card-title>
                                <v-card-subtitle>JohnDoe2020</v-card-subtitle>

                                <v-card-title>Email</v-card-title>
                                <v-card-subtitle>John@Mail.com</v-card-subtitle>

                                <v-card-title>Date of Birth</v-card-title>
                                <v-card-subtitle>04-02-1969</v-card-subtitle>
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
                                <v-text-field label="Name" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Date of Birth" required></v-text-field>
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

            }
        }
    }
</script>