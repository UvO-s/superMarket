import { createStore } from "vuex";

const setLocalCartList = state => {
  let { cartList } = state;
  cartList = {};
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
};

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  try {
    return JSON.parse(localStorage.cartList);
  } catch (e) {
    return {};
  }
};

export default createStore({
  state: {
    cartList: getLocaCartList(),
    allChecked: true
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {}
      };
      let product = shopInfo.productList[productId];
      if (!product) {
        product = productInfo;
        product.count = 0;
      }
      product.count += num;
      product.count < 0 && (product.count = 0);
      num > 0 && (product.check = true);
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;

      setLocalCartList(state);
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;

      setLocalCartList(state);
    },
    cleanCartProducts(state, payload) {
      const productInfo = state.cartList[payload.shopId].productList;
      for (const i in productInfo) {
        productInfo[i].count = 0;
      }

      setLocalCartList(state);
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;

      if (products && !state.allChecked) {
        for (const key in products) {
          const product = products[key];
          product.check = true;
        }
        state.allChecked = true;
      } else {
        for (const key in products) {
          const product = products[key];
          product.check = false;
        }
        state.allChecked = false;
      }

      setLocalCartList(state);
    },
    ifAllCheck(state, payload) {
      state.allChecked = payload.allChecked;

      setLocalCartList(state);
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;

      setLocalCartList(state);
    },
    clearCartData(state, payload) {
      state.cartList[payload.shopId].productList = {};
    }
  }
});
