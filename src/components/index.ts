
import PageTable from './PageTable/index.vue'
import DateRange from './DateRange/index.vue'
import DatePickerRange from './DatePickerRange/index.vue'
import UserInfo from './UserInfo/userInfo.vue'
import UpdatePwd from './UserInfo/updatePwd.vue'
import SrmCard from './SrmCard/index.vue'
import Footer from './Footer/index.vue'
import Upload from './Upload/index.vue'
const components = {
  install: function(Vue: any) {
    Vue.component('page-table', PageTable)
    Vue.component('date-range', DateRange)
    Vue.component('date-picker-range', DatePickerRange)
    Vue.component('user-info', UserInfo)
    Vue.component('update-pwd', UpdatePwd)
    Vue.component('srm-footer', Footer)
    Vue.component('srm-card', SrmCard)
    Vue.component('upload', Upload)
  }
}

export default components
