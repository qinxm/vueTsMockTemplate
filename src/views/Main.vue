<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div
      v-if="sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />-->
    <sidebar class="sidebar-container"/>
    <div :class="{hasTagsView: showTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar/>
        <tags-view v-if="showTagsView"/>
      </div>
      <app-main/>
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel>-->
    </div>
  </div>
</template>

<script lang="ts">
import Router, { RouteConfig, Route } from "vue-router";
import { Component, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { AppMain, Navbar, Sidebar, TagsView } from "@/components/layout";
import { DictionaryModule } from "@/store/modules/dictionary";
import { UserModule } from "@/store/modules/user";
import { PermissionModule } from "@/store/modules/permission";
import ResizeMixin from "@/mixin/resize";
import { setCacheDataToStorage, getStorageData } from "@/utils/cache";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view";

interface RouteObj {
  path: string;
  component: any;
  meta: any;
}

@Component({
  name: "Main",
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  }
})
export default class extends mixins(ResizeMixin) {
  private onbeforeunload = [];
  private resetRouteTimer: any;
  get visitedViews() {
    return TagsViewModule.visitedViews;
  }
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation
    };
  }

  get showSettings() {
    return false;
  }

  get showTagsView() {
    return true;
  }

  get fixedHeader() {
    return true;
  }

  created() {
    this.getStorage();
    DictionaryModule.fetchDictionyList();
    if (!UserModule.name) {
      UserModule.fetchUserInfo();
    }
    window.onunload = (e: any) => {
      this.saveStorage();
    };
  }
  /**
   * 将缓存中的数据存储到TagsViewModule中
   */
  private addTags(tags: any[]) {
    tags.map(item => {
      let tag: ITagView = {};
      tag = { ...item };
      if (tag.name) {
        TagsViewModule.addView(tag);
      }
    });
  }
  /**
   * 从缓存中取标签数据
   */
  private getStorage() {
    getStorageData({
      key: "supplier:visitedViews",
      successCallback: data => {
        // 将本地存储的标签页添加到vuex中
        this.addTags(data);
      },
      failCallback: () => {
        console.log("没有缓存的标签页");
      }
    });
  }
  /**
   * 将vuex中缓存的标签页信息存储loacalstorage中
   */
  private saveStorage() {
    let visitedPath = this.visitedViews.map(item => {
      return {
        path: item.path,
        fullPath: item.fullPath,
        name: item.name,
        meta: item.meta,
        query: item.query
      };
    });
    localStorage.setItem("supplier:visitedViews", JSON.stringify(visitedPath));
  }
  private readVisitedViews() {
    console.log("this.visitedViews", this.visitedViews);
  }
  private handleClickOutside() {
    // AppModule.CloseSideBar(false)
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background: #252830;
  /deep/.el-menu {
    border-color: #252930;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
<style lang="scss">
.el-range-editor--small {
  ::v-deep .el-range-separator {
    width: 20px;
  }
}
</style>
