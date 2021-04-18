<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe677;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe694;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import ShopInfo from "../../components/ShopInfo";
import { get } from "../../utils/request";
import Content from "./Content.vue";
import Cart from "./Cart.vue";

const useShopInfoEffect = () => {
  const data = reactive({ item: {} });
  const route = useRoute();

  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { getItemData, item };
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const router = useRouter();
    const { item, getItemData } = useShopInfoEffect();

    getItemData();
    const handleBackClick = () => {
      router.back();
    };
    return { item, handleBackClick };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: $content-font-color;
      &::placeholder {
        color: $content-font-color;
      }
    }
  }
}
</style>
