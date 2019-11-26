<template>
  <div>
    <v-app-bar dense app fixed clipped-left height="70px" color="red darken-3">
      <v-toolbar-items v-for="item in items" :key="item.title" link @click="$router.push(item.to)">
        <v-btn text color="white">{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-spacer />

      <v-menu :close-on-content-click="false" :nudge-width="100" offset-x transition="slide-x-reverse-transition"
        bottom >
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">
            Account<v-icon>mdi-menu-down</v-icon>
          </v-btn>
          <v-avatar>
            <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="John">
          </v-avatar>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="John">
              </v-list-item-avatar>
              <v-list-item-content v-for="profile in profiles" :key="profile.id_user">
                <v-list-item-title>{{profile.username}}</v-list-item-title>
                <v-list-item-subtitle>{{profile.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-btn depressed dark style="text-transform: none !important;" color="blue accent-3"
                  @click="$router.push('/profile')">Profile</v-btn>

                <v-btn depressed dark style="text-transform: none !important;" color="red accent-3" @click="logout()">
                  Sign Out</v-btn>
              </v-list-item-content>

            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <VContent>
      <template>
        <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" aspect-ratio="2">
          <router-view />
        </v-img>
      </template>
    </VContent>

    <v-footer padless :inset="footer.inset" app absolute>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 text-left">
          ©{{ new Date().getFullYear() }} — Created with <v-icon>mdi-heart</v-icon> by Kelompok 6 PAW™ — Raditya Dimas
          Bagus Santoso — Alexander Rivelino Aldo Aldiero — Yanuarius Hermawan — Alisha Aileen
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        drawer: null,
        profiles: [],
        profile: new FormData(),
        username: '',
        footer: {
          inset: false,
        },
        items: [{
            title: "Home",
            to: "/home"
          },
          {
            title: "Service",
            to: "/service"
          },
          {
            title: "Sparepart",
            to: "/sparepart"
          },
          {
            title: "Towing",
            to: "/towing"
          }
        ],
        menus: [{
            title: "Profile",
            to: "/profile"
          },
          {
            title: "Sign Out",
            to: "/login"
          }
        ]
      };
    },
    methods: {

      logout() {
        localStorage.removeItem("token");
        this.$router.push({
          name: "loginLayout"
        });
        alert("Success Logout!");
      },

      getData() {
        var uri = this.$apiUrl + "/user/" + this.id_user;
        this.$http.get(uri).then(response => {
          this.profiles = response.data.message;
        })
      }
    },
    mounted() {
      this.getData();
      if (localStorage.id_user) {
        this.id_user = localStorage.id_user;
      }
    },
  };
</script>