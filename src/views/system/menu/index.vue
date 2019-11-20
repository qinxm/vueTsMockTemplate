<template>
  <div class="menu-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="menu-tree" style="min-height:600px;">
          <div class="menu-tree-actions">
            <el-input placeholder="输入关键字进行过滤" v-model.trim="filterText"></el-input>
            <el-button type="primary" @click="toAdd" style="margin-left:20px;">添加</el-button>
          </div>
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-tree
              ref="tree"
              highlight-current
              :data="data"
              :node-key="treeAttributes.nodeKey"
              :default-expanded-keys="treeAttributes.defaultExpendedKey"
              current-node-key="treeAttributes.currentNodeKey"
              :filter-node-method="filterNode"
              :props="props"
              @current-change="handleCurrentChange"
            ></el-tree>
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="min-height: 600px;">
          <el-form
            ref="menuForm"
            :model="menuForm"
            :rules="menuFormRule"
            label-width="80px"
            size="small"
          >
            <el-form-item label="上级菜单:">
              <el-input v-model.trim="menuForm.parentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称:" prop="name">
              <el-input v-model.trim="menuForm.name" :disabled="formDisabled"></el-input>
            </el-form-item>
            <el-form-item label="类型:" prop="type">
              <div style="display:flex;">
                <el-select v-model="menuForm.type" placeholder="请选择" :disabled="formDisabled">
                  <el-option
                    v-for="(item,key) in typeList"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="menuForm.isShow"
                  placeholder="请选择"
                  :disabled="formDisabled"
                  style="margin-left:5px;"
                >
                  <el-option
                    v-for="(item,key) in isShowList"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="链接:" prop="href">
              <el-input v-model.trim="menuForm.href" :disabled="formDisabled"></el-input>
            </el-form-item>
            <el-form-item label="图标:">
              <el-input v-model.trim="menuForm.icon" :disabled="formDisabled"></el-input>
            </el-form-item>
            <el-form-item label="请求方式:">
              <el-select v-model="menuForm.method" :disabled="formDisabled" placeholder="请选择">
                <el-option
                  v-for="(item,key) in methodList"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序:">
              <el-input v-model.trim="menuForm.sort" :disabled="formDisabled"></el-input>
            </el-form-item>
            <el-form-item label="是否展开:">
              <el-select v-model="menuForm.open" :disabled="formDisabled" placeholder="请选择">
                <el-option
                  v-for="(item,key) in openList"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限标识:">
              <el-input v-model.trim="menuForm.permission" :disabled="formDisabled"></el-input>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input v-model.trim="menuForm.remarks" :disabled="formDisabled"></el-input>
            </el-form-item>

            <el-form-item v-if="!formDisabled">
              <el-button type="primary" @click="doSubmit('menuForm')">保存</el-button>
              <el-button v-if="menuForm.id" type="danger" @click="doDelete">删除</el-button>
              <el-button type="primary" @click="doCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formDisabled && menuForm.id">
              <el-button type="primary" @click="doEdit">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { cloneDeep } from "lodash";
import { Component, Vue, Watch } from "vue-property-decorator";
import ElementUI from "element-ui";
import {
  getMenuTreeList,
  getMenuDetail,
  createMenu,
  editMenu,
  deleteMenu
} from "@/config/service/system.ts";
import { debuglog } from "util";
interface MenuObj {
  id?: string; // ID
  name?: string; // 名称
  href?: string; //路径
  icon?: string; //图标
  type?: number; // 0菜单 1按钮
  isShow?: string; // 1显示 0隐藏
  parentName?: string; //父Name
  parentId?: string; // 父ID
  permission?: string; // 权限标识
  remarks?: string; // 备注
  sort?: number; //排序
  method?: string; //GET,POST,PUT/DELETE
  open?: number; // 1 展开 0 折叠
}
interface TreeAttributes {
  nodeKey?: string;
  defaultExpendedKey?: string[];
  currentNodeKey?: string | number;
}
// 菜单管理
@Component({
  name: "MenuList"
})
export default class extends Vue {
  private formDisabled = true;
  private openList = [
    {
      label: "是",
      value: 1
    },
    {
      label: "否",
      value: 0
    }
  ];
  private methodList = [
    {
      label: "GET",
      value: "GET"
    },
    {
      label: "POST",
      value: "POST"
    },
    {
      label: "PUT",
      value: "PUT"
    },
    {
      label: "DELETE",
      value: "DELETE"
    }
  ];
  private typeList = [
    {
      label: "菜单",
      value: 0
    },
    {
      label: "按钮",
      value: 1
    }
  ];
  private isShowList = [
    {
      label: "显示",
      value: "1"
    },
    {
      label: "隐藏",
      value: "0"
    }
  ];
  private menuFormRule = {
    name: [
      { required: true, message: "请输入名称", trigger: "blur" },
      { min: 1, max: 100, message: "长度在 1 到 100 个字符", trigger: "blur" }
    ],
    type: [{ required: true, message: "请选择类型", trigger: "blur" }],
    href: [
      { required: true, message: "请输入链接", trigger: "blur" },
      { min: 3, max: 2000, message: "最小长度为3", trigger: "blur" }
    ]
  };
  private data = [];
  private props = {
    children: "children",
    label: "name"
  };
  private count = 1;
  private filterText = "";
  private menuForm: MenuObj = {};
  private formOrigin: MenuObj = {};
  private treeAttributes: TreeAttributes = {
    nodeKey: "id",
    defaultExpendedKey: [],
    currentNodeKey: ""
  };

  mounted() {
    this.getMenuTree();
  }

  @Watch("filterText")
  private onfilterTextChange(val: string) {
    if(this.$refs.menuForm) {
      (this.$refs.tree as ElementUI.Tree).filter(val);
    }
  }
  private initForm() {
    if(this.$refs.menuForm) {
      (this.$refs.menuForm as ElementUI.Form).resetFields();
    }
    this.menuForm = {
      id: "", //id
      name: "", // 名称
      href: "", //路径
      icon: "", //图标
      type: 0, // 0菜单 1按钮
      isShow: "1", // 1显示 0隐藏
      parentName: "", //父Name
      parentId: "", // 父ID
      permission: "", // 权限标识
      remarks: "", // 备注
      sort: 1, //排序
      method: "GET", //GET,POST,PUT/DELETE
      open: 0 // 是否展开
    };
  }
  private async getMenuTree() {
    let data = await getMenuTreeList();
    this.data = data.result;
  }
  private doEdit() {
    this.formDisabled = false;
  }
  private doDelete() {
    if (this.menuForm && this.menuForm.id) {
      this.$confirm("确认要删除该菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await deleteMenu({
            id: this.menuForm.id
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getMenuTree();
        })
        .catch(() => {});
    } else {
      this.$message.error("菜单数据错误！");
    }
  }
  private doCancel() {
    this.formDisabled = true;
    this.menuForm = cloneDeep(this.formOrigin);
    (this.$refs.menuForm as ElementUI.Form).clearValidate();
  }
  private async doSubmit(formName: string) {
    (this.$refs[formName] as ElementUI.Form).validate(async valid => {
      if (valid) {
        // 编辑
        if (this.menuForm && this.menuForm.id) {
          let data = await editMenu(this.menuForm);
          if (data.code == 200) {
            this.$message.success("保存成功！");
          }
        } else {
          // 新增
          let data = await createMenu(this.menuForm);
          if (data.code == 200) {
            this.$message.success("保存成功！");
          }
        }
        this.getMenuTree();
        this.formDisabled = true;
      }
    });
  }

  /**
   * 新增
   */
  private toAdd() {
    this.formDisabled = false;
    this.initForm();
    const node = (this.$refs.tree as ElementUI.Tree).getCurrentNode();
    // 添加一级目录
    if (node && node.id) {
      this.menuForm.parentName = (node as any).name;
      this.menuForm.parentId = node.id;
    } else {
      this.menuForm.parentId = "1";
      return;
    }
  }
  /**
   * 点击树节点
   */
  private handleCurrentChange(data: any, node: any) {
    this.getDetail(data.id);
  }
  /**
   * 获取详情
   */
  private async getDetail(id: string) {
    this.treeAttributes.currentNodeKey = id;
    this.treeAttributes.defaultExpendedKey = [id];
    this.formDisabled = true; //
    const data = await getMenuDetail({
      id
    });
    this.menuForm = data.result;
    if (data.result && data.result.parent) {
      this.menuForm.parentName = data.result.parent.name;
      this.menuForm.parentId = data.result.parent.id;
    }
    this.formOrigin = cloneDeep(this.menuForm);
  }

  private filterNode(value: any, data: any) {
    if (!value) return true;
    if (data && data.name) {
      return data.name.indexOf(value) !== -1;
    } else {
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  padding: 15px;
  .menu-tree {
    min-height: 500px;
    &-actions {
      display: flex;
    }
  }
}
</style>
