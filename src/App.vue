<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.title = "POS";
  },
  data: () => ({
    //
  }),
};
</script>
