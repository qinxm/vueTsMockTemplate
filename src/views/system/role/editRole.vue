<template>
  <el-dialog
    :title="dialogTitle"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    append-to-body
    width="80%"
  >
    <el-form ref="ruleForm" size="small" label-width="120px">
      <el-form-item label="角色名称:">
        <el-input placeholder="请输入" v-model.trim="role.name"/>
      </el-form-item>
      <el-form-item label="是否系统数据:">
        <el-select v-model="role.isSys" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:10px; color:#f00;">“是”代表此数据只有超级管理员能进行修改，“否”则表示拥有角色修改人员的权限都能进行修改</span>
      </el-form-item>
      <el-form-item label="角色授权:">
        <el-scrollbar>
          <el-tree
            ref="tree"
            show-checkbox
            highlight-current
            :data="menuList"
            :node-key="treeAttributes.nodeKey"
            :default-checked-keys="role.menuIds"
            current-node-key="treeAttributes.currentNodeKey"
            :props="props"
          ></el-tree>
        </el-scrollbar>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSave">保 存</el-button>
      <el-button type="default" @click="onClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  getMenuTreeList,
  getRoleDetail,
  createRole,
  editRole
} from "@/config/service/system";
import { deleteKey, validResponse } from "@/utils/index";
import ElementUI from "element-ui";

//采购调整对账
@Component({
  name: "EditRole"
})
export default class extends Vue {
  @Prop({ default: null }) private id!: number;
  @Prop({ default: null }) private visible!: boolean;
  private dialogTitle = "";

  get dialogVisible() {
    if (this.$refs['ruleForm']) {
      (this.$refs['ruleForm'] as ElementUI.Form).resetFields();
    }
    if (this.visible) {
      this.getMenus();
      if (this.id === 0) {
        this.dialogTitle = "新建角色";
      } else {
        this.dialogTitle = "编辑角色";
        this.getRoleInfo(this.id);
      }
    }
    return this.visible;
  }
  set dialogVisible(visible: boolean) {
    this.$emit("update:visible", visible);
  }
  private role: any = {
    name: "",
    isSys: "1",
    menuIds: []
  };
  private options = [
    {
      value: "1",
      label: "是"
    },
    {
      value: "0",
      label: "否"
    }
  ];
  private menuList: any[] = [];
  private treeAttributes: any = {
    nodeKey: "id",
    defaultCheckedKeys: [],
    currentNodeKey: ""
  };
  private props = {
    children: "children",
    label: "name"
  };
  private async getRoleInfo(id) {
    let data = await getRoleDetail({
      id
    });
    if (!validResponse(data)) return;
    this.role = data.result;
    this.treeAttributes = data.result.menuIds;
  }
  private async getMenus() {
    let data = await getMenuTreeList();
    if (!validResponse(data)) return;
    this.menuList = data.result;
  }
  private async doSave() {
    let menuIds = (this.$refs["tree"] as ElementUI.Tree).getCheckedKeys();
    this.role.menuIds = menuIds;
    if (this.role.id) {
      let data = await editRole(this.role);
      if (!validResponse(data)) return;
    } else {
      let data = await createRole(this.role);
      if (!validResponse(data)) return;
    }
    this.$message.success("保存成功");
    this.dialogVisible = false;
    this.$emit("afterSave");
  }
  private onClose() {
    this.dialogVisible = false;
  }
}
</script>
