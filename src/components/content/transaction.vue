<template>
  <v-container>
    <v-Card class="elevation-20" style="background:#242526;color:white;">
      <v-card-title>
        <v-container>
          <v-row
            class="d-flex-row align-center pa-0"
            v-for="(it, i) in $store.getters.getSalesItem"
            :key="i"
          >
            <v-col cols="12" class="d-flex flex-row align-center pa-0">
              <span>{{ it.tranId }} Price: {{ it.total }}</span>
              <v-spacer></v-spacer>
              <b-button pill variant="outline-primary">Sale</b-button>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
    </v-Card>
  </v-container>
</template>

<script>
export default {
  name: "Transaction"
};
</script>

<style></style>
