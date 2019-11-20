<template>
  <div>
    <page-table
      :headerShow="false"
      :pageNum.sync="formQuery.pageNum"
      :pageSize.sync="formQuery.pageSize"
      :total="total"
      @pagination="getList"
    >
      <div slot="actions">
        <el-button type="primary" @click="doAdd()">添加角色</el-button>
      </div>
      <el-table slot="table" stripe :data="tableData" style="width: 100%" border size="small">
        <el-table-column type="index" width="45"></el-table-column>
        <el-table-column prop="name" label="角色" min-width="150"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="doEdit(scope.row.id)">修改</el-button>
            <el-button type="primary" size="mini" @click="doDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-table>
    <edit-role :visible.sync="dialogVisible" :id="currentId" @afterSave="doQuery"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getRoleList, deleteRole } from "@/config/service/system";
import { deleteKey, validResponse } from "@/utils/index";
import EditRole from "./editRole.vue";
// 特殊扣款对账
@Component({
  name: "RoleList",
  components: {EditRole}
})
export default class extends Vue {
  private currentId = 0
  private dialogVisible = false
  private formQuery = {
    pageNum: 1,
    pageSize: 30
  };
  private total = 0;
  private tableData = [];
  mounted() {
    this.doQuery();
  }
  private doQuery() {
    this.formQuery.pageNum = 1;
    this.getList();
  }
  private async getList() {
    try {
      const data = await getRoleList(deleteKey(this.formQuery));
      this.tableData = data.result.list;
      this.total = data.result.total;
    } catch (e) {
      console.log("getSpecialDeductList", e);
    }
  }
  private async doEdit(id) {
    if (id) {
      this.currentId = id
      this.dialogVisible = true
    } else {
      this.$message.error("角色ID有误，请检查");
    }

  }
  private doAdd() {
    this.dialogVisible = true
  }
  private doDelete(id) {
    if (id) {
      this.$confirm("确认要删除该角色吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = await deleteRole(id);
        if (!validResponse(data)) return;
        this.$message.success("删除成功");
        this.doQuery();
      }).catch(() => {
      });
    } else {
      this.$message.error("角色ID有误，请检查");
    }
  }
}
</script>

