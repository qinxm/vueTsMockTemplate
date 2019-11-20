<template>
  <div class="user-list">
    <page-table
      :pageNum.sync="formQuery.pageNum"
      :pageSize.sync="formQuery.pageSize"
      :total="total"
      @pagination="getList"
    >
      <el-form slot="header" size="small" :inline="true" :model="formQuery">
        <el-form-item label="类型">
          <el-select clearable filterable v-model="formQuery.type" placeholder="请选择">
            <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model.trim="formQuery.description" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQuery()">查询</el-button>
        </el-form-item>
      </el-form>
      <div slot="actions">
        <el-button type="primary" @click="doAdd()">添加字典</el-button>
      </div>
      <el-table border stripe slot="table" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="value" label="键值" align="center"></el-table-column>
        <el-table-column prop="label" label="标签" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="{row}">
            <el-button size="mini" type="primary" @click="doEdit(row)">修改</el-button>
            <el-button size="mini" type="primary" @click="doDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-table>
    <edit-dict :visible.sync="dialogVisible" :data="currentDict" @afterSave="doQuery"/>
  </div>
</template>
<script lang="ts">
import {
  getDictList,
  getDictSelect,
  getDictTypeList,
  deleteDict
} from "@/config/service/system";
import { Component, Vue, Watch } from "vue-property-decorator";
import EditDict from "./editDict.vue";
import { deleteKey, validResponse } from "@/utils/index";

// 特殊扣款对账
@Component({
  name: "DictList",
  components: { EditDict }
})
export default class extends Vue {
  private currentDict = {};
  private dialogVisible = false;
  private formQuery = {
    pageNum: 1,
    pageSize: 30
  };
  private total = 0;
  private tableData = [];
  private typeList = [];

  mounted() {
    this.getTypeList();
    this.getList();
  }
  private doQuery() {
    this.formQuery.pageNum = 1;
    this.getList();
  }
  private async getTypeList() {
    let data = await getDictTypeList();
    if (!validResponse(data)) return;
    this.typeList = data.result;
  }
  private async getList() {
    let data = await getDictList(this.formQuery);
    if (data.code === 200) {
      this.tableData = data.result.list;
      this.total = data.result.total;
    }
  }
  private async doEdit(row) {
    console.log(row);
    this.currentDict = row;
    this.dialogVisible = true;
  }
  private doAdd() {
    this.currentDict = {};
    this.dialogVisible = true;
  }
  private doDelete(id) {
    if (id) {
      this.$confirm("确认要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await deleteDict({ id });
          if (!validResponse(data)) return;
          this.$message.success("删除成功");
          this.doQuery();
          this.getTypeList();
        })
        .catch(() => {});
    } else {
      this.$message.error("字典ID有误，请检查");
    }
  }
}
</script>
<style lang="scss">
</style>

