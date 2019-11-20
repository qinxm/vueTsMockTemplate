<template>
  <div class="home-container">
    欢迎登录后台管理平台
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Home',
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.home-container {
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  line-height: 200px;
  background-color: #f0f2f5;
  background-image: url("../assets/home_bg.png");
  background-position: center center;
  background-size: 680px 280px;
  background-repeat: no-repeat;
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 7px;
  color: #2F324D;
}
</style>
