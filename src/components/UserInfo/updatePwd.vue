<template>
  <el-dialog title="修改密码" :close-on-click-modal="false" :visible.sync="dialogVisible" append-to-body width="30%">
    <el-form
      ref="userForm"
      size="small"
      :model="userForm"
      :rules="userFormRule"
      label-width="100px"
    >
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input type="password" v-model.trim="userForm.oldPwd" clearable placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model.trim="userForm.newPwd" clearable placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="reNewPwd">
        <el-input type="password" v-model.trim="userForm.reNewPwd" clearable placeholder="请输入确认密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button type="default" @click="onClose">返回</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form } from "element-ui";
import { getUserInfo, editPwd } from "@/config/service/user";
import { isValidPassword } from "@/utils/validate";

//采购调整对账
@Component({
  name: "CheckAccount"
})
export default class extends Vue {
  @Prop({ default: null }) private id!: number;
  @Prop({ default: null }) private visible!: boolean;

  get dialogVisible() {
    if(this.$refs["userForm"]) {
      (this.$refs["userForm"] as Form).resetFields();
    }
    return this.visible;
  }
  set dialogVisible(visible: boolean) {
    this.$emit("update:visible", visible);
  }
  private validatePassword = (
    rule: any,
    value: string,
    callback: (error?: any) => void
  ) => {
    if (!isValidPassword(value)) {
      callback(new Error("8-16位且包含字母、数字、特殊字符（&除外）"));
    } else {
      callback();
    }
  };
  private userForm = {
    oldPwd: "",
    newPwd: "",
    reNewPwd: ""
  };

  private userFormRule = {
    oldPwd: [
      { required: true, message: "请输入旧密码", trigger: "blur" },
      { validator: this.validatePassword, trigger: "blur" }
    ],
    newPwd: [
      { required: true, message: "请输入新密码", trigger: "blur" },
      { validator: this.validatePassword, trigger: "blur" }],
    reNewPwd: [
      { required: true, message: "请输入确认密码", trigger: "blur" },
      { validator: this.validatePassword, trigger: "blur" }
    ]
  };
  private onSubmit() {
    (this.$refs["userForm"] as Form).validate(async valid => {
      if (valid) {
        let res = await editPwd(this.userForm);
        if (res.code == 200) {
          this.$message.success("保存成功");
          this.onClose();
        } else {
          this.$message.error(res.message);
        }
      }
    });
  }
  private onClose() {
    this.dialogVisible = false;
  }
}
</script>
