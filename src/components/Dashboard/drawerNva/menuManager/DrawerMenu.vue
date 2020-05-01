<template>
  <v-container class="ma-0 pa-0">
    <v-navigation-drawer
      v-model="$store.getters.getDrawerState"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :src="bg"
      absolute
      dark
      class="elevation-20"
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="@/assets/icon.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Redev</v-list-item-title>
            <v-list-item-subtitle>admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="menuClick(item.title)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "DrawerMenu",
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Shops", icon: "shop_two" },
        { title: "Products", icon: "view_list" },
        { title: "Bill", icon: "print" },
        { title: "Transaction", icon: "library_books" },
        { title: "About", icon: "mdi-help-box" }
      ],
      color: "#242526",
      right: false,
      miniVariant: true,
      expandOnHover: true,
      background: false
    };
  },
  methods: {
    menuClick(id) {
      switch (id) {
        case "Dashboard":
          this.$store.dispatch("onCheckPage", "home");
          break;
        case "Products":
          this.$store.dispatch("onCheckPage", "showProduct");
          break;
        case "Shops":
          this.$store.dispatch("onCheckPage", "shop");
          break;
        case "About":
          this.$store.dispatch("onCheckPage", "about");
          break;
        case "Transaction":
          this.$store.dispatch("onCheckPage", "transaction");
          break;
      }
    }
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  }
};
</script>

<style></style>
