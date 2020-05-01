<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="(it, i) in order" :key="i">
        <v-card dark class="mx-auto elevation-20" max-width="344">
          <v-img
            :src="
              it.image
                ? it.image
                : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
            "
          ></v-img>

          <v-card-title>{{ it.productName }}</v-card-title>

          <v-card-subtitle>{{ it.price }}</v-card-subtitle>

          <!-- hide component and calculate total price -->
          <!-- <v-card-subtitle hidden>
            {{ (totalPrice += parseInt(it.price, 10)) }}
          </v-card-subtitle>-->

          <v-card-actions>
            <v-spacer></v-spacer>
            <b-button
              class="w-50"
              @click="onRemoveIte(it.tranId, it.price)"
              pill
              variant="outline-danger"
            >Remov</b-button>
            <!-- <v-btn color="purple" text @click="check(i)">
              Explore
            </v-btn>-->
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="ma-4">
        <v-card dark class="elevation-20">
          <center>
            <v-col cols="12 ma-4" sm="6" md="8">
              <label>Total : {{ totalPrice }}.00</label>

              <!-- user enter price  -->
              <!-- get money from customer  -->

              <v-text-field
                type="number"
                label="payment"
                id="id"
                sm="6"
                md="2"
                @change="onChange"
                v-model="change"
              ></v-text-field>

              <!-- change  -->
              <label>Change : {{ customerChange }}.00</label>

              <!-- show btn sale product  -->
              <v-spacer></v-spacer>
              <p></p>
              <b-button v-b-modal.modal-sm class="w-50" pill variant="outline-primary">Sale</b-button>
            </v-col>
          </center>
        </v-card>
      </v-col>
      <b-modal @ok="onSale" id="modal-sm" size="sm" title="Products">Do you want to proceed?</b-modal>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uid } from "uuid";
import axios from "axios";
export default {
  name: "Cart",
  props: ["order", "totalPrice"],
  data() {
    return {
      change: 0,
      customerChange: 0
    };
  },
  methods: {
    makeToast(variant = null, message) {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },
    onChange() {
      this.customerChange = this.change - this.totalPrice;
    },
    onRemoveIte(item, price) {
      //   this.order = this.order.filter((it) => it.productId !== item);

      //update cart notify
      this.$emit("onRemoveItCart", item, price);
      //const t = parseInt(this.totalPrice, 0);
      // t - parseInt(price, 10);
    },
    async onSale() {
      const item = {
        tranId: uid(),
        total: this.totalPrice,
        change: this.customerChange,
        details: this.order
      };

      await axios
        .post(
          "http://localhost:8082/pos/api/v1/product/sale/saleProduct",
          item,
          {
            headers: {
              "auth-token": localStorage.getItem("access_token")
            }
          }
        )
        .then(it => {
          console.log(it);
          this.$emit("onClearItem");
          this.change = 0;
          this.makeToast("success", "Buy Product  Successfully..");
        })
        .catch(err => {
          console.log(err);
          this.makeToast("danger", "Buy Product Faild..");
        });
    }
  }
};
</script>

<style></style>
