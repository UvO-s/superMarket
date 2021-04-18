<template>
  <div
    class="mask"
    v-if="showCart"
    @click="
      () => {
        showCart = !showCart;
      }
    "
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__all__icon iconfont"
            v-html="total.allChecked ? '&#xe646;' : '&#xe65b;'"
          ></span>
          全选
        </div>
        <div class="product__header__clear">
          <span @click="() => cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <div
        class="product__item"
        v-for="(item, index) in productList"
        :key="index"
      >
        <div
          class="product__item__checked iconfont"
          @click="() => changeCartItemChecked(shopId, item._id)"
          v-html="item.check ? '&#xe646;' : '&#xe65b;'"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1);
              }
            "
            >-</span
          >
          {{ item.count || 0 }}
          <span
            class="product__number__plus"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1);
              }
            "
            >+</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="
            () => {
              showCart = !showCart;
            }
          "
        />
        <div class="check__icon__tag">{{ total.count }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{ total.price }}</span>
      </div>
      <div class="check__btn" v-show="total.count > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }"
          >去结算</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "@vue/runtime-core";
import { useCommonCartEffect } from "../../effects/cartEffects";

const useCartEffect = () => {
  const route = useRoute();
  const shopId = route.params.id;
  const store = useStore();

  const { changeCartItemInfo, productList, total } = useCommonCartEffect(
    shopId
  );
  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", {
      shopId,
      productId
    });
  };
  const cleanCartProducts = shopId => {
    store.commit("cleanCartProducts", { shopId });
  };

  const setCartItemsChecked = () => {
    store.commit("setCartItemsChecked", { shopId });
  };

  return {
    setCartItemsChecked,
    total,
    productList,
    shopId,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts
  };
};

export default {
  name: "Cart",
  setup() {
    const showCart = ref(false);
    const {
      setCartItemsChecked,
      total,
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts
    } = useCartEffect();
    return {
      showCart,
      setCartItemsChecked,
      total,
      productList,
      changeCartItemInfo,
      shopId,
      changeCartItemChecked,
      cleanCartProducts
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixin.scss";

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  background: $bgColor;
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      right: 0.1rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $highlight-fontColor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-font-color;
    font-size: 0.12rem;
    &__price {
      line-height: 0.49rem;
      color: $highlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    a {
      color: $bgColor;
      text-decoration: none;
    }
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    font-size: 0.14rem;
  }
}
.product {
  background: $bgColor;
  flex: 1;
  overflow-y: scroll;
  &__header {
    display: flex;
    height: 0.52rem;
    border-bottom: solid 1px $content-bgColor;
    &__clear {
      flex: 1;
      line-height: 0.52rem;
      border-bottom: 1px solid #ecdede;
      text-align: right;
      margin-right: 0.1rem;
    }
    &__all {
      width: 0.64rem;
      margin-left: 0.18rem;
      line-height: 0.52rem;
      &__icon {
        color: $btn-bgcolor;
        font-size: 0.2rem;
      }
    }
    font-size: 0.14rem;
    color: $content-font-color;
  }
  &__item {
    &__checked {
      color: $btn-bgcolor;
      font-size: 0.2rem;
      line-height: 0.5rem;
      position: relative;
      left: -0.1rem;
    }
    &__detail {
      overflow: hidden;
    }
    display: flex;
    padding: 0.12rem 0.16rem;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    position: relative;
    &__img {
      height: 0.46rem;
      width: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      @include ellipse;
      margin: 0%;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-font-color;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
      margin-left: 0.06rem;
    }
  }
  &__number {
    position: absolute;
    right: 0;
    bottom: 0.12rem;
    &__minus,
    &__plus {
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      display: inline-block;
      border: 0.01rem $medium-fontColor solid;
      font-size: 0.2rem;
      text-align: center;
      line-height: 0.16rem;
      margin: 0 0.05rem;
    }
    &__minus {
      border: 0.01rem solid $medium-fontColor;
      color: $medium-fontColor;
    }
    &__plus {
      background: $btn-bgcolor;
      color: bgColor;
    }
  }
}
</style>
