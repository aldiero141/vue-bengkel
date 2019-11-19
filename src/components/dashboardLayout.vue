<template>
  <div>
    <v-app-bar dark app fixed clipped-left height="70px" color="grey darken-3">
      <v-toolbar-items v-for="item in items" :key="item.title" link @click="$router.push(item.to)">
          <v-btn text>{{ item.title }}</v-btn text>
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
          title: "User Controller",
          icon: "mdi-human-male",
          to:"/"
        },
        {
          title: "Branch Controller",
          icon: "mdi-human-male",
          to:"/branch"
        },
        {
          title: "Towing Controller",
          icon: "mdi-human-male",
          to:"/towing"
        },
      ]
    };
  }
};
</script>
