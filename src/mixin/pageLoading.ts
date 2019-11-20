import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'PageLoadingMixin'
})
export default class extends Vue {
  private pageLoadingText = ''

  startLoading (text?: string) {
    if (!text) {
      text = '加载中...'
    }
    this.pageLoadingText = text
  }

  stopLoading () {
    this.pageLoadingText = ''
  }
}
