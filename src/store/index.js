import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Promise } from "core-js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiToken: localStorage.getItem("access_token") || null,
    signUpStatus: "",
    drawer: true,
    checkPage: "shop",
    productItem: [],
    saleItem: [],
  },
  getters: Object.assign({
    getSalesItem(state) {
      return state.saleItem;
    },
    getProduct(state) {
      return state.productItem;
    },
    getCheckPage(state) {
      return state.checkPage;
    },
    getDrawerState(state) {
      return state.drawer;
    },
    getToken(state) {
      return state.apiToken !== null;
    },
    getLoginStatue(state) {
      return state.loginStatus;
    },
    getSignUpStatus(state) {
      return state.signUpStatus;
    },
  }),
  mutations: {
    setSalesItem(state, value) {
      state.saleItem = value;
    },
    setProduct(state, value) {
      state.productItem = value;
    },
    setCheckPage(state, value) {
      state.checkPage = value;
    },
    setDrawerState(state, value) {
      state.drawer = value;
    },
    setToken(state, value) {
      state.apiToken = value;
    },
    destroyToken(state) {
      state.apiToken = null;
    },
    setSignUpStatus(state, value) {
      state.signUpStatus = value;
    },
  },
  actions: {
    async onSaleChange(context) {
      await axios
        .get("http://192.168.1.37:8082/pos/api/v1/product/sale/get", {
          headers: {
            "auth-token": localStorage.getItem("access_token"),
          },
        })
        .then((result) => {
          context.commit("setSalesItem", result.data.sales);
          //alert(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log("onGetSales :" + err);
          // alert(JSON.stringify(err))
        });
    },
    async onProductChange(context) {
      await axios
        .get("http://192.168.1.37:8082/pos/api/v1/product/get", {
          headers: {
            "auth-token": localStorage.getItem("access_token"),
          },
        })
        .then((result) => {
          context.commit("setProduct", result.data);
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCheckPage(context, page) {
      context.commit("setCheckPage", page);
    },
    onChangeDrawer(context, data) {
      context.commit("setDrawerState", data);
    },
    async Login(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://192.168.1.37:8082/pos/api/v1/user/login", data)
          .then((response) => {
            const token = response.data.access_token;

            localStorage.setItem("access_token", token);

            //set state
            context.commit("setToken", token);

            resolve(response);
          })
          .catch((err) => {
            console.log(err);
            context.commit("destroyToken");
            reject(err);
          });
      });
    },
    async onRegister(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://192.168.1.37:8082/pos/api/v1/user/register", data)
          .then((result) => {
            resolve(result);
            context.commit("setSignUpStatus", "Create Account Successfully");
          })
          .catch((err) => {
            console.log(err);
            context.commit("setSignUpStatus", "Create Account Error");
            context.commit("destroyToken");
            reject(err);
          });
      });
    },
    logOut(context) {
      //clear token in storage
      localStorage.removeItem("access_token");
      context.commit("destroyToken");
    },
  },
  modules: {},
});
