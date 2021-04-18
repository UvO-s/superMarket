<template>
  <div class="wrapper">
    <StaticPart />
    <nearby />
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
import StaticPart from "./StaticPart";
import Nearby from "./Nearby";
import Docker from "../../components/Docker";

export default {
  name: "Home",
  components: {
    StaticPart,
    Nearby,
    Docker
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixin.scss";
.wrapper {
  overflow: scroll;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem;
}
</style>
