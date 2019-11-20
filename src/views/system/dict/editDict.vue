<template>
  <el-dialog
    :title="dialogTitle"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    append-to-body
  >
    <el-form ref="ruleForm" :rules="rules" :model="dict" size="small" label-width="100px">
      <el-form-item label="键值:" prop="value">
        <el-input placeholder="请输入" v-model.trim="dict.value"/>
      </el-form-item>
      <el-form-item label="标签:" prop="label">
        <el-input placeholder="请输入" v-model.trim="dict.label"/>
      </el-form-item>
      <el-form-item label="类型:" prop="type">
        <el-input placeholder="请输入" v-model.trim="dict.type"/>
      </el-form-item>
      <el-form-item label="描述:" prop="description">
        <el-input placeholder="请输入" v-model.trim="dict.description"/>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          v-model.trim="dict.sort"
          controls-position="right"
          :min="1"
          :max="10000"
          :precision="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input placeholder="请输入" v-model.trim="dict.remarks"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doSave">保 存</el-button>
      <el-button type="default" @click="onClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, PropSync } from "vue-property-decorator";
import { createDict, editDict } from "@/config/service/system";
import { deleteKey, validResponse } from "@/utils/index";
import ElementUI from "element-ui";
import { cloneDeep, clone } from "lodash";

//采购调整对账
@Component({
  name: "EditDict"
})
export default class extends Vue {
  @Prop({ default: null }) private data!: any;
  @PropSync("visible", { default: false }) private dialogVisible!: boolean;

  private dialogTitle = "";
  @Watch("data", { deep: true, immediate: true })
  private currentDictChange(value) {
    this.dict = clone(value);
    if(this.dict && this.dict.id) {
      this.dialogTitle = "编辑字典";
    } else {
      this.dialogTitle = "新建字典";
    }
  }
  @Watch('dialogVisible')
  private dialogVisibleChange(value) {
    if(!value) {
       (this.$refs['ruleForm'] as ElementUI.Form).resetFields()
    }
  }

  // get dialogVisible() {
  //   if (this.visible) {
  //     if(this.$refs['ruleForm'] as ElementUI.Form) {
  //     (this.$refs['ruleForm'] as ElementUI.Form).resetFields()
  //     }
  //     console.log(this.$refs["ruleForm"]);

  //     if (this.data && this.data.id) {
  //       this.dialogTitle = "编辑字典";
  //     } else {
  //       this.dialogTitle = "新建字典";
  //     }
  //   }
  //   return this.visible;
  // }
  // set dialogVisible(visible: boolean) {
  //   this.$emit("update:visible", visible);
  // }
  private rules = {
    description: [{ required: true, message: "请输入描述", trigger: "blur" }],
    label: [{ required: true, message: "请输入标签", trigger: "blur" }],
    sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
    type: [{ required: true, message: "请输入类型", trigger: "blur" }],
    value: [{ required: true, message: "请输入键值", trigger: "blur" }]
  };
  private dict: any = {
    description: "",
    label: "",
    remarks: "",
    sort: 10,
    type: "",
    value: ""
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

  private async doSave() {
    (this.$refs["ruleForm"] as ElementUI.Form).validate(async valid => {
      if (valid) {
        if (this.dict.id) {
          let data = await editDict(this.dict);
          if (!validResponse(data)) return;
        } else {
          let data = await createDict(this.dict);
          if (!validResponse(data)) return;
        }
        this.$message.success("保存成功");
        this.dialogVisible = false;
        this.$emit("afterSave");
      }
    });
  }
  private onClose() {
    this.dialogVisible = false;
  }
}
</script>
