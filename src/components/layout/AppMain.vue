<template>
  <section class="app-main" ref="SrmAppMain">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TagsViewModule } from '@/store/modules/tags-view'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  get cachedViews() {
    return TagsViewModule.cachedViews
  }

  get key() {
    return this.$route.path
  }
  /**
   * 页面跳转时,scrollTop = 0
   */
  @Watch('$route')
  private routeChanged(){
    const SrmAppMain = this.$refs['SrmAppMain']
    if(SrmAppMain) {
      (SrmAppMain as Element).scrollTop = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  58  */
  min-height: calc(100vh - 58px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 58px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 58 + 50 */
    min-height: calc(100vh - 108px);
  }

  .fixed-header+.app-main {
    padding-top: 108px;
  }
}
</style>
