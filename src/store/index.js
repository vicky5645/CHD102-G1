import { createStore } from "vuex";
const updateStorage = (cart) => {
  localStorage.setItem("my-cart", JSON.stringify(cart));
};
<<<<<<< HEAD
//使用者資料傳到SessionStorage
=======
//使用者資料傳到sessionStorage
>>>>>>> vicky
const updateStorageLogin = (newUser) => {
  // 只能保存字串，這裡將JavaScript 處理成 JSON
  sessionStorage.setItem("my-user", JSON.stringify(newUser));
};
import axios from "axios";
import { BASE_URL } from "@/assets/js/common.js";
export default createStore({
  state: {
    // name: "",
    userInfo: null,
    // userInfo: {
    //   uid: existUser.uid, // 沒有存進資料庫
    //   mem_no: "",
    //   mem_name: "",
    //   mem_salutation: "",
    //   mem_email: "",
    //   mem_mobile: "",
    //   mem_addr: "",
    //   mem_acc: "",
    //   mem_pwd: "",
    //   pattern_file: "",
    // },
    isLogin: false,
    cart: [],
    totalPrice: 0,
    recipient: null,
    //總票價
    totalBooking: 0,
    //景點
    attraction: {
      attr_id: 1,
      attr_name: "",
    },

    // 論壇資料
    AnnouncementData: [],

    //Loading
    Loading: false,
  },
  getters: {
    cartList(state) {
      return state.cart;
    },
    totalPrice(state) {
      return state.totalPrice;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    setRecipient(state, recipient) {
      state.recipient = recipient;
    },
    setAnnouncementData(state, payload) {
      state.AnnouncementData = [...payload];
    },
    //取得總票價
    getTotalBooking(state, value) {
      state.totalBooking = value;
    },
    //傳景點id給元件
    throw_attr_id(state, parent_attr_id) {
      state.attraction.attr_id = parent_attr_id;
    },
    //設定登入狀態
    setIsLogin(state, value) {
      state.isLogin = value;
    },
    //更新使用者名稱 (沒用到)
    // setName(state, userName) {
    //   state.name = userName;
    // },
    //更新使用者資料
    updateUser(state, newUser) {
      state.userInfo = newUser;
      //取得使用者資料的同時建立sessionStorage'my-user'
      updateStorageLogin(state.userInfo);
    },
    //刪除sessionStorage使用者資料
    deleteUser(state) {
      state.userInfo = null;
      sessionStorage.removeItem("my-user");
    },
    updateCart(state, newData) {
      state.cart = [...newData];
    },
    // addToCart(state,item){
    //   state.cart.push(item);
    // },
    // calculateSum(state) {
    //   state.totalPrice = state.cart.reduce((accumulator, item) => {
    //       return accumulator + item.totalPrice;
    //     }, 0);
    // },
    //從商品頁面新增商品到購物車
    addToCart(state, newData) {
      let item = state.cart.find((i) => i.title === newData.title);

      if (item) {
        item.amount = parseInt(item.amount) + parseInt(newData.amount);
        item.totalPrice =
          parseInt(item.totalPrice) +
          parseInt(newData.price) * parseInt(newData.amount);
      } else {
        newData.totalPrice = parseInt(newData.price) * parseInt(newData.amount);
        state.cart.push({ ...newData });
      }

      updateStorage(state.cart);
    },
    //在購物車頁面增加數量
    addAmount(state, title) {
      let item = state.cart.find((i) => i.title === title);
      if (item) {
        item.amount = parseInt(item.amount) + 1;
        // item.price = (parseInt(item.price) / (item.amount - 1)) * item.amount;
        item.totalPrice += parseInt(item.price);
      }
      //更新總價
      state.totalPrice = state.cart.reduce((accumulator, item) => {
        return accumulator + item.totalPrice;
      }, 0);
      //更新購物車
      updateStorage(state.cart);
    },

    //在購物車頁面減少數量
    minusAmount(state, title) {
      let item = state.cart.find((i) => i.title === title);
      if (item && parseInt(item.amount) > 1) {
        item.amount = parseInt(item.amount) - 1;
        // item.price = (parseInt(item.price) / (item.amount + 1)) * item.amount;
        item.totalPrice -= parseInt(item.price);
      }
      //更新總價
      state.totalPrice = state.cart.reduce((accumulator, item) => {
        return accumulator + item.totalPrice;
      }, 0);
      //更新購物車
      updateStorage(state.cart);
    },

    //在購物車頁面刪除商品
    removeFromCart(state, title) {
      state.cart = state.cart.filter((i) => i.title !== title);
      //更新總價
      state.totalPrice = state.cart.reduce((accumulator, item) => {
        return accumulator + item.totalPrice;
      }, 0);
      //更新購物車
      updateStorage(state.cart);
    },
    calculateSum(state) {
      state.totalPrice = state.cart.reduce((accumulator, item) => {
        return accumulator + item.totalPrice;
      }, 0);
    },
    //清空購物車
    clearCart(state) {
      state.cart = [];
      updateStorage(state.cart);
    },
    closeLoading(state) {
      state.Loading = false;
    },
  },
  actions: {
    async getAnnouncementData(context, value) {
      try {
        const res = await axios.get(
          `${BASE_URL}selectBackendAnnouncements.php`
        );
        if (!res) throw new Error("沒抓到資料");
        context.commit("setAnnouncementData", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    // addCart({commit},item){
    //   commit("addCart",item)
    // },
    initStorage({ commit }) {
      const cart = localStorage.getItem("my-cart");
      if (!cart) return;
      commit("updateCart", JSON.parse(cart));
    },
    // initStorage() {
    //   const cart = localStorage.getItem('my-cart');
    //   if (!cart) return;
    //   commit("updateCart", JSON.parse(cart));
    // },
    //接受 commit 觸發 mutation
    initStorageLogin({ commit }) {
      //指定 sessionStorage 中 'my-user'的資料
      const user = sessionStorage.getItem("my-user");
      commit("setIsLogin", false);
      // 假如沒有建立'my-user'就結束操作
      if (!user) return;
      // 'my-user' 存在，執行updateUser()，JSON 字串解析成 JavaScript 物件
      commit("updateUser", JSON.parse(user));
      commit("setIsLogin", true);
    },
  },
  modules: {},
});
