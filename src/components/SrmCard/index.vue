<template>
  <el-card class="srm-card " :class="parentClass" shadow="hover">
    <div class="srm-card-header">{{header}}</div>
    <div class="srm-card-body flex flex-wrap pd15" v-if="fieldList && fieldList.length">
      <div class="info-field-item" v-for="field in fieldList" :key="field.key" :style="{width: width}">
        <span class="info-field-label"> {{field.label}}： </span>
        <span class="info-field-value">{{field.value}}</span>
      </div>
    </div>
    <div class="srm-card-body">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface IFieldItem {
  label: '',
  value: '',
  key: '',
}
@Component({
  name: "SrmCard"
})
export default class extends Vue {
  @Prop({ default: '' }) private header!: string;
  @Prop({ default: () => { return []} }) private fieldList!: Array<IFieldItem>;
  @Prop({ default: 3 }) private col!: number;
  @Prop({ default: true }) private hover!: boolean;
  // 传递自定义样式
  @Prop({ default: '' }) private parentClass!: string;

  get width() {
    if(this.col > 0) {
      let w = (100/this.col).toFixed(2) + '%'
      return w
    } else {
      return '50%'
    }

  }
}
</script>
<style lang="scss" scoped>
.srm-card {
  background-color:#fff;
  font-size: 12px;
  color: #514E5F;
  padding:10px;

    .srm-card-header {
      border-left: 3px solid #4280ff;
      padding-left: 20px;
      margin: 15px 0;
      font-size: 16px;
      font-weight: 500;
      color: #3E3F42;
    }
    /deep/ .el-card__body {
      padding: 0;
    }
    .srm-card-body {
      line-height: 26px;
    }

  &.light-card {
    border: none;
    padding: 0;
    .srm-card-header {
      border: none;
      padding: 10px 10px 10px 10px;
      color: #999999;
      background-color:#fafafa;
    }
    .srm-card-body {
      padding: 0 10px 10px 10px;
      /deep/.el-form-item {
        margin-bottom: 5px;
        .el-form-item__label {
          font-size: 13px;
          color: #999999;
          font-weight: normal;
        }
      }
    }

  }



}

</style>
