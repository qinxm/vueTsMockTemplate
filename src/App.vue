<template>
<!-- <button @click="testReq">测试请求</button> -->
  <div id="app">
    <router-view v-if="isRouterAlive" :key="$route.fullpath" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { PermissionModule } from "@/store/modules/permission";

import { setCacheDataToStorage, getStorageData } from "@/utils/cache";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view";
import { UserModule } from "@/store/modules/user";

import Axios from 'axios'

@Component({
  name: "App",
})
export default class extends Vue {
  // private exclude = ['Home', 'Login', 'Register']
  //  get cachedViews() {
  //   return TagsViewModule.cachedViews
  // }
  private isRouterAlive: boolean = true;

  // 任何子组件都可以使用的当前页面刷新机制(体验更好)
  @Provide()
  private reload() {
    this.isRouterAlive = false;
    this.$nextTick(function() {
      this.isRouterAlive = true;
    });
  }

  mounted() {
    // 模拟菜单获取
    // PermissionModule.GenerateRoutes(MenuData);
  }

  testReq() {
    Axios.post('/srm/sys/menu/tree/').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
