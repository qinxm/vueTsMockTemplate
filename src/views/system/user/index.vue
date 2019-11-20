<template>
  <div>
    <page-table
      :pageNum.sync="formQuery.pageNum"
      :pageSize.sync="formQuery.pageSize"
      :total="total"
      @pagination="changeNumber"
    >
      <el-form slot="header" size="small" :inline="true" :model="formQuery">
        <el-form-item label="登录名：">
          <el-input v-model.trim="formQuery.loginName" clearable placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model.trim="formQuery.name" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQuery()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table border stripe slot="table" :data="tableData" style="width: 100%">
        <el-table-column prop="loginName" label="登录名" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
        <el-table-column label="操作" width="100px" fixed="right">
          <template slot-scope="{row}">
            <el-button size="mini" type="primary" @click="reviseUser(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-table>
  </div>
</template>
<script lang="ts">
import { getUserList, getUserDetail } from "@/config/service/user";
import { Component, Vue, Watch } from "vue-property-decorator";
import { deleteKey, validResponse } from "@/utils/index";
// 用户管理
@Component({
  name: "UserList"
})
export default class extends Vue {
  private formQuery = {
    pageNum: 1,
    pageSize: 30,
    loginName: "",
    name: ""
  };
  private total = 0;
  private tableData = [];
  activated() {
    if (this.$route.params && this.$route.params.refresh) this.getUserList();
  }
  mounted() {
    this.getUserList();
  }
  private doQuery() {
    this.formQuery.pageNum = 1;
    this.getUserList();
  }
  private changeNumber(e) {
    this.formQuery.pageNum = e.pageNum;
    this.formQuery.pageSize = e.pageSize;
    this.getUserList();
  }
  private async getUserList() {
    let data = await getUserList(deleteKey(this.formQuery));
    if (!validResponse(data)) return;
    this.tableData = data.result.list;
    this.total = data.result.total;
  }
  private async reviseUser(row) {
    this.$router.push({
      path: "detail",
      query: {
        loginName: row.loginName
      }
    });
  }
}
</script>
<style lang="scss">
</style>

