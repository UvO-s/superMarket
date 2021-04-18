<template>
  <div class="order">
    <div class="order__price">
      实付金额<b>￥{{ total.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-if="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台吗？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则支付将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { post } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/cartEffects";

// 下单相关逻辑
const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter();
  const store = useStore();

  const handleConfirmOrder = async isCanceled => {
    const products = [];
    for (const i in productList.value) {
      const product = productList.value[i];
      products.push({ id: parseInt(product._id, 10), num: product.count });
    }
    try {
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      });
      if (result?.errno === 0) {
        store.commit("clearCartData", shopId);
        router.push({ name: "Home" });
      }
    } catch (e) {
      router.push({ name: "Home" });
    }
  };
  return { handleConfirmOrder };
};

// 蒙层展示相关的逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false);
  const handleShowConfirmChange = status => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};

export default {
  name: "Order",
  setup() {
    const route = useRoute();
    const shopId = parseInt(route.params.id, 10);
    const { total, shopName, productList } = useCommonCartEffect(shopId);
    const { handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList
    );
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect();
    return {
      showConfirm,
      handleShowConfirmChange,
      total,
      handleConfirmOrder
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixin.scss";
.order {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-font-color;
    text-align: left;
  }
  &__btn {
    width: 0.98rem;
    background: #4fb0f9;
    color: $bgColor;
    text-align: center;
    font-size: 0.14rem;
  }
}
.mask {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    width: 3.3rem;
    height: 1.56rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      color: #333;
      margin-top: 0.24rem 0 0 0;
      line-height: 0.26rem;
    }
    &__desc {
      font-size: 0.14rem;
      color: #666;
      margin-top: 0.08rem;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem 0 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.9rem;
      line-height: 0.32rem;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
      }
      &--last {
        margin-left: 0.12rem;
      }
    }
  }
}
</style>
