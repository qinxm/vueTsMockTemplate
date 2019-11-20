<template>
  <div>
    <el-date-picker
      :disabled="disabled"
      v-model="value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      @change="onChange"
      :clearable="clearable"
    ></el-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "DateRange"
})
export default class extends Vue {
   @Prop({ default: true }) private clearable!: boolean;
  @PropSync("minDateField", { default: "" }) private _minDateField!:
    | string
    | Date;
  @PropSync("maxDateField", { default: "" }) private _maxDateField!:
    | string
    | Date;
  @Prop({ default: false }) private disabled!: Boolean;

  private get value() {
    return [this._minDateField, this._maxDateField];
  }
  private set value(data) {
    this._minDateField = data[0];
    this._maxDateField = data[1];
  }

  @Watch("minDateField", { immediate: true, deep: true })
  private minDateFieldChange(val) {
    this.value = [val || "", this.value[1]];
  }

  @Watch("maxDateField", { immediate: true, deep: true })
  private maxDateFieldChange(val) {
    this.value = [this.value[0], val || ""];
  }

  private onChange(data: Array<Date>) {
    if (Array.isArray(data) && data.length == 2) {
      this._minDateField = data[0];
      this._maxDateField = data[1];
    } else {
      this._minDateField = "";
      this._maxDateField = "";
    }
    this.$emit("change", data);
  }
}
</script>
