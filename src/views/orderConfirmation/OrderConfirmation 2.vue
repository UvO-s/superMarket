<template>
  <div class="wrapper">
    <top-area />
    <product-list />
    <order />
  </div>
</template>

<script>
import Order from "./Order.vue";
import ProductList from "./ProductList.vue";
import TopArea from "./TopArea.vue";
export default {
  components: { TopArea, ProductList, Order },
  name: "OrderConfirmation"
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixin.scss";
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
  overflow-y: scroll;
}
</style>
