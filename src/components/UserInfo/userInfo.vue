<template>
  <el-dialog
    title="查看个人信息"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    append-to-body
    width="500px">
    <el-form ref="ruleForm"
      size="small"  :model="userForm"  label-width="80px">
       <el-form-item label="名称:">
         {{userForm.name}}
      </el-form-item>
      <el-form-item label="登录名:">
         {{userForm.loginName}}
      </el-form-item>
      <el-form-item label="手机:">
        {{userForm.mobile}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="onClose">返 回</el-button>
  </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form } from 'element-ui';
import { getUserInfo } from '@/config/service/user'


//采购调整对账
@Component({
  name: "CheckAccount",
})
export default class extends Vue {
  @Prop({ default: null }) private id!: number;
  @Prop({ default: null }) private visible!: boolean;

  get dialogVisible() {
    if(this.visible) {
      this.getInfo()
    }
    return this.visible
  }
  set dialogVisible (visible: boolean) {
    this.$emit('update:visible', visible)
  }
  private userForm = {
  }
  private async getInfo() {
    let data = await getUserInfo()
    this.userForm = data.result
    console.log(this.userForm)
  }

  private onClose() {
    this.dialogVisible = false
  }
}
</script>
