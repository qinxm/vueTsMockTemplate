import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }
}
