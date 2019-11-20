<template>
  <div>
    <el-date-picker :disabled="disabled" :picker-options="startOptions" @on-change="onStartChange" :clearable="true" :type="type" v-model="queryParams[startKey]" :placeholder="startPlaceHolder"  :style="selfStyle"/>
    <span class="separator"> {{separatorText}} </span>
    <el-date-picker :disabled="disabled" :picker-options="endOptions" @on-change="onEndChange" :clearable="true" :type="type" v-model="queryParams[endKey]" :placeholder="endPlaceHolder"  :style="selfStyle"/>
  </div>
</template>

<script>
// 检验时分秒可选值
const validateTimeOptions = (value) => {
  const {hours, minutes, seconds} = value
  const hoursRegex = /2[0-3]|[0-9]/
  const minutesRegex = /[1-5][0-9]|[0-9]/
  if (!hoursRegex.test(hours)) return false
  if (!minutesRegex.test(minutes)) return false
  if (!minutesRegex.test(seconds)) return false
  return true
}

export default {
  name: 'DatePickerRange',
  props: {
    disabled:  {
      type: Boolean,
      default: false
    },
    // 开始时间字段名称
    startKey: String,
    // 结束时间字段名称
    endKey: String,
    // 查询对象
    queryParams: {
     type: Object,
     default: () => {
       return {}
     }
    },
    // 最大间隔 单位：天
    maxInterval: {
      type: Number,
      // 默认-1 不限制
      default: -1
    },
    // 最小可选日期
    minDate: {
      type: Date,
      default: () => new Date(1970,1,1),
      validator: function (value) {
        return (value instanceof Date)
      }
    },
    // 最大可选日期
    maxDate: {
      type: Date,
      default: () => new Date(3019,1,1),
      validator: function (value) {
        return (value instanceof Date)
      }
    },
    startTimeOptions: {
      type: Object,
      default: () => {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      },
      validator: (value) => {
        return validateTimeOptions(value)
      }
    },
    endTimeOptions: {
      type: Object,
      default: () => {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      },
      validator: (value) => {
        return validateTimeOptions(value)
      }
    },
    startPlaceHolder: {
      type: String,
      default: '请选择开始日期'
    },
    endPlaceHolder: {
      type: String,
      default: '请选择结束日期'
    },
    // 可选值： date datetime
    type: {
      type: String,
      default: 'date'
    },
    // 分隔符
    separatorText: {
      type: String,
      default: '-'
    }
  },
  computed: {
    selfStyle() {
      if (this.type== 'date') {
        return {
          width: '140px'
        }
      } else {
        return {
          width: '200px'
        }
      }

    },
    endOptions () {
      return {
        disabledDate: (date) => {

          const selectedStartDate = (this.queryParams[this.startKey])
          if (selectedStartDate && date instanceof Date) {
            const selectedStartDateCopy =  new Date(selectedStartDate)
            this.setHMS(selectedStartDateCopy)

            // 判断是否有最大间隔限制
            if (this.maxInterval > 0) {
              let newDate = new Date(selectedStartDateCopy)
              newDate.setDate(newDate.getDate()+this.maxInterval)
              // 如果最大日期比interval之后的小 取最大日期
              if (this.maxDate < newDate) {
                newDate = this.maxDate
              }
              return date.getTime()<selectedStartDateCopy.getTime() || date.getTime() > newDate.getTime()
            }
            return date.getTime() < selectedStartDateCopy.getTime() || date.getTime() > this.maxDate.getTime()
          }
          return date<this.minDate || date>this.maxDate
        }
      }
    },
    startOptions () {
      return {
        disabledDate: (date) => {
          const selectedEndDate = (this.queryParams[this.endKey])
          if ( selectedEndDate && date instanceof Date ) {
            const selectedEndDateCopy = new Date(selectedEndDate)
            if (this.type=='date') this.setHMS(selectedEndDateCopy)

            // 判断是否有最大间隔限制
            if (this.maxInterval > 0) {
              let newDate = new Date(selectedEndDateCopy)
              newDate.setDate(newDate.getDate()-this.maxInterval)
              // 如果最小日期比interval之后的大 取最小日期
              if (this.minDate > newDate) {
                newDate = this.minDate
              }
              return date.getTime() > selectedEndDateCopy.getTime() || date.getTime() < newDate.getTime()
            }
            return date.getTime() > selectedEndDateCopy.getTime() || date.getTime() < this.minDate.getTime()
          }
          return date < this.minDate || date > this.maxDate
        }
      }
    }
  },
  created() {

  },
  data () {
    return {
    }
  },
  methods: {
    setHMS (date, h=0, m=0, s=0) {
      if (date instanceof Date) {
        date.setHours(h)
        date.setMinutes(m)
        date.setSeconds(s)
      }
    },
    onStartChange(date) {
      if (!date) return
      const newDate = new Date(date)
      const currentDate = this.queryParams[this.startKey]
      if (this.type == 'datetime' && !this.isYMDEqual(newDate, currentDate)) {
        const {hours, minutes, seconds} = this.startTimeOptions
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        newDate.setSeconds(seconds)
      }
      this.queryParams[this.startKey] = newDate
    },
    onEndChange(date) {
      if (!date) return
      const newDate = new Date(date)
      const currentDate = this.queryParams[this.endKey]
      if (this.type == 'datetime' && !this.isYMDEqual(newDate, currentDate)) {
        // 只有时间选择框  && 当前选择的是某个日期而不是时分秒  才执行
        const {hours, minutes, seconds} = this.endTimeOptions
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        newDate.setSeconds(seconds)
      }
      this.queryParams[this.endKey] = newDate
    },
    // 判断两个日期的 年月日 是否相同
    isYMDEqual (srcDate, targetDate) {
      if (!(srcDate instanceof Date) || !(targetDate instanceof Date)) {
        return false
      }
      return srcDate.getFullYear()==targetDate.getFullYear() && srcDate.getMonth()==targetDate.getMonth() && srcDate.getDay()==targetDate.getDay()
    },
  }
}
</script>

<style lang="scss" scoped>
  .separator {
    display:inline-block;
    width: 14px;
    text-align:center;
  }
</style>
