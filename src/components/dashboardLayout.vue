<template>
  <div>
    <v-app-bar dense app fixed clipped-left height="70px" color="red darken-3">
      <v-toolbar-items v-for="item in items" :key="item.title" link @click="$router.push(item.to)">
          <v-btn text>{{ item.title }}</v-btn>
      </v-toolbar-items>
      <VSpacer />
      <v-toolbar-title style="font-size: 21px;" class="white--text ml-2">PAW-UAJY</v-toolbar-title>
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
      ]
    };
  }
};
</script>
