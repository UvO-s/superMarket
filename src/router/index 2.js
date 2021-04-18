import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName:"home" */ "../views/home/Home")
  },
  {
    path: "/orderConfirmation/:id",
    name: "OrderConfirmation",
    component: () =>
      import(
        /* webpackChunkName:"home" */ "../views/orderConfirmation/OrderConfirmation"
      )
  },
  {
    path: "/shop/:id",
    name: "Shop",
    component: () => import(/* webpackChunkName:"home" */ "../views/shop/Shop")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName:"home" */ "../views/login/Login"),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName:"home" */ "../views/Register/Register"),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: "/cartList",
    name: "CartList",
    component: () =>
      import(/* webpackChunkName: "cartList" */ "../views/cartList/CartList")
  },
  {
    path: "/orderList",
    name: "OrderList",
    component: () =>
      import(/* webpackChunkName: "orderList" */ "../views/orderList/OrderList")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = name === "Login" || name === "Register";
  isLogin || isLoginOrRegister ? next() : next({ name: "Login" });
});

export default router;
