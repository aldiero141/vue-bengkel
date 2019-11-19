<template>
  <div>
    <v-app-bar dense app fixed clipped-left height="70px" color="red darken-3">
      <v-toolbar-items v-for="item in items" :key="item.title" link @click="$router.push(item.to)">
          <v-btn text color="white">{{ item.title }}</v-btn>
      </v-toolbar-items>
      <VSpacer />
      <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn text dark v-on="on">
          <v-avatar>
            <img src="https://i.imgur.com/NLDugGD.jpg" alt="John">
          </v-avatar>
          Username
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="menu in menus" :key="menu.title" link @click="$router.push(menu.to)">
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
    <VContent>
      <router-view />
    </VContent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [{
          title: "Home",
          to:"/home"
        },
        {
          title: "Service",
          to:"/service"
        },
        {
          title: "Sparepart",
          to:"/sparepart"
        },
        {
          title: "Towing",
          to:"/towing"
        },
        {
          title: "Profile",
          to:"/profile"
        },
      ],
      menus: [{
          title: "Edit Profile",
          to:"/editProfile"
        },
        {
          title: "Sign Out",
          to:"/signOut"
        }
      ]
    };
  }
};
</script>
