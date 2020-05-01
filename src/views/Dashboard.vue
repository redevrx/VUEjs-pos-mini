<template>
  <v-app class="dashboard">
    <AppBar :itemCart="itemCart" />
    <!-- <div>
        <b-button variant="success" @click="makeToast('success')" class="mb-2"
          >Success</b-button
        >
    </div>-->
    <!-- grid screes 4 { 1 -> drawer 2-. content 1-menu lsit}  -->

    <v-content class="ma-0 pa-0">
      <DrawerMenu />

      <!-- user click page new product  -->
      <v-row
        v-if="$store.getters.getCheckPage === 'product'"
        class="d-flex flex-row justify-center align-center"
      >
        <product @onSaveProduct="saveProduct" />
      </v-row>

      <!-- show all product on stock  and edit remove-->
      <v-row
        v-if="$store.getters.getCheckPage === 'showProduct'"
        class="d-flex flex-row justify-center align-center"
      >
        <showProduct @onEditProduct="editProduct" @onRemove="removeProduct" />
      </v-row>
      <!-- home page  -->
      <v-row
        v-if="$store.getters.getCheckPage == 'shop'"
        class="d-flex flex-row justify-center align-center"
      >
        <shop @onAddCart="addToCart" />
      </v-row>
      <!-- Cart order detail page  -->
      <v-row
        v-if="$store.getters.getCheckPage == 'cart'"
        class="d-flex flex-row justify-center align-center"
      >
        <cart
          :order="productAddCart"
          :totalPrice="totalPrice"
          @onRemoveItCart="removeItemCart"
          @onClearItem="clearItem"
        />
      </v-row>
      <!-- show history sales  -->
      <v-row
        v-if="$store.getters.getCheckPage == 'transaction'"
        class="d-flex flex-row justify-center align-center"
      >
        <transaction />
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/Dashboard/AppBar/AppBar.vue";
import DrawerMenu from "@/components/Dashboard/drawerNva/menuManager/DrawerMenu.vue";
import product from "@/components/content/product.vue";
import showProduct from "@/components/content/showProduct.vue";
import shop from "@/components/content/shop.vue";
import cart from "@/components/content/cart.vue";
import transaction from "@/components/content/transaction.vue";
import axios from "axios";
import { v4 as uid } from "uuid";
export default {
  name: "Dashboard",
  components: {
    AppBar,
    DrawerMenu,
    product,
    showProduct,
    shop,
    cart,
    transaction
  },
  data() {
    return {
      checkPage: "home",
      itemCart: 0,
      productAddCart: [],
      totalPrice: 0.0
    };
  },
  methods: {
    userLogOut() {
      this.$store
        .dispatch("logOut")
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },
    makeToast(variant = null, message) {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },
    async saveProduct(data, file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("_id", data._id);
      formData.append("productId", data.productId);
      formData.append("productName", data.productName);
      formData.append("bal", data.bal);
      formData.append("unit", data.unit);
      formData.append("price", data.price);
      formData.append("image", data.image);

      await axios
        .post("http://localhost:8082/pos/api/v1/product/add", formData, {
          headers: {
            "auth-token": localStorage.getItem("access_token")
          }
        })
        .then(() => {
          this.makeToast("success", "Save Product Successfuly..");
          this.$store.dispatch("onCheckPage", "showProduct");
        })
        .catch(err => {
          this.makeToast("danger", "Failed :" + err.message);
          console.log(err);
        });
    },
    async editProduct(data) {
      // alert("image new" + Object.keys(file).length);

      const dataEdit = {
        _id: data._id,
        productId: data.productId,
        productName: data.productName,
        bal: data.bal,
        unit: data.unit,
        price: data.price,
        image: data.image
      };

      await axios
        .put("http://localhost:8082/pos/api/v1/product/edit", dataEdit, {
          headers: {
            "auth-token": localStorage.getItem("access_token")
          }
        })
        .then(() => {
          this.$store.dispatch("onEditChange", false);
          this.makeToast("success", "Update Product Successfuly...");
          console.log("OnEdit  Chage Image as the products");
        })
        .catch(err => {
          this.makeToast("danger", "Failed.." + err.message);
          console.log(err);
        });
    },
    async removeProduct(id) {
      const url = "http://localhost:8082/pos/api/v1/product/remove/" + id;
      await axios
        .delete(url, {
          headers: {
            "auth-token": localStorage.getItem("access_token")
          }
        })
        .then(() => {
          this.makeToast("success", "Remove Product Successfuly..");
        })
        .catch(err => {
          this.makeToast("danger", "Failed :" + err.message);
          console.log(err);
        });
    },
    addToCart(data) {
      const item = {
        tranId: uid(),
        productId: data.productId,
        productName: data.productName,
        bal: data.bal,
        unit: data.unit,
        price: data.price,
        image: data.image
      };
      this.productAddCart.push(item);
      // alert(JSON.stringify(this.productAddCart))
      this.itemCart += 1;
      this.totalPrice += parseFloat(data.price, 10);
      this.makeToast("success", "Add to Cart Successfully..");
    },
    removeItemCart(id, price) {
      this.totalPrice -= parseFloat(price, 10);
      this.productAddCart = this.productAddCart.filter(it => it.tranId !== id);
      this.updateNotify();
    },
    updateNotify() {
      this.itemCart -= 1;
      this.makeToast("success", "Remove to Cart Successfully..");
    },
    clearItem() {
      this.productAddCart = [];
      this.totalPrice = 0;
      this.itemCart = "";
    }
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #18191a;
}
</style>
