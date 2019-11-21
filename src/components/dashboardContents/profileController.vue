<template>
    <v-container>
        <v-card class="mx-auto"
            color="white"
            width="1500px"
            >
            <v-card-title><h2>Profile</h2></v-card-title>
            <v-row>
                <v-col md="3">
                    <v-avatar size="200">
                        <img src="https://i.imgur.com/VD09afj.jpg" alt="John">
                    </v-avatar>
                </v-col>
                <v-col md="5">
                    <v-card-title>John Doe</v-card-title>
                    <v-card-subtitle>John@Mail.com</v-card-subtitle>
                </v-col>
                <v-col>
                    <v-flex xs6>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil</v-icon>Edit Profile
                        </v-btn>
                    </v-flex>
                    <v-spacer> </v-spacer>
                    <v-flex xs6>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="deep-purple accent-3"
                            @click="dialog_password = true">
                            <v-icon size="18" class="mr-2">mdi-pencil</v-icon>Change Password
                        </v-btn>
                    </v-flex>
                </v-col>
            </v-row>


        </v-card>
    
        <v-card class="mx-auto"
            color="white"
            width="1500px">
            <v-card-title>User Info</v-card-title>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">User Info</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Date of Birth*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Address*" required></v-text-field>
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

        <v-dialog v-model="dialog_password" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Account Management</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Email*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Old Password*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="New Password*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Confirm Password*" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog_password = false">Close</v-btn>
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
                dialog_password: false,
            }
        }
    }
</script>