<template>
   <div class="error-container">
      <img :src="errorImg"/>
      <!-- <div class="text-center">{{errorMsg}}</div> -->
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Error',
})
export default class extends Vue {
  private errorMsg = '哎呀，出错了～';
  private errorImg = require('../assets/404.png');
}
</script>
<style lang="scss" scoped>
.error-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
}
</style>
