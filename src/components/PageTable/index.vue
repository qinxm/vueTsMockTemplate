<template>
  <div class="page-table-container">
    <el-card class="page-header" v-if="headerShow">
      <slot name="header"/>
    </el-card>
    <el-card class="page-table" :body-style="{ padding: '0px' }">
      <div class="page-table-actions">
        <slot name="actions"/>
      </div>
      <div class="page-table-table">
        <slot name="table"/>
      </div>
    </el-card>
    <el-pagination
      v-if="paginationShow"
      class="page-table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size.sync="pageLimit"
      background
      v-bind="$attrs"
      layout="total, prev, pager, next, sizes,jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "PageTable"
})
export default class extends Vue {
  @Prop({ default: 1 }) private pageNum!: number;
  @Prop({ default: 0 }) private total!: number;
  @Prop({ default: 30 }) private pageSize!: number;
  @Prop({ default: true }) private paginationShow!: Boolean;
  @Prop({ default: true }) private headerShow!: Boolean;

  get currentPage() {
    return this.pageNum;
  }

  set currentPage(value) {
    this.$emit("update:pageNum", value);
  }

  get pageLimit() {
    return this.pageSize;
  }

  set pageLimit(value) {
    this.$emit("update:pageSize", value);
  }
  private handleSizeChange(pageSize: number) {
    this.$emit("pagination", { pageNum: this.currentPage, pageSize: pageSize });
  }
  private handleCurrentChange(pageNum: number) {
    this.$emit("pagination", { pageNum: pageNum, pageSize: this.pageLimit });
  }
}
</script>
<style lang="scss" scoped>
.page-table-container {
  .page-header {
    margin: 15px;
    ::v-deep .el-form-item {
      margin-right: 10px;
      &__label {
        font-weight: 400;
        min-width: 105px;
      }
    }
  }
  ::v-deep .page-table {
    margin: 15px;

    &-actions {
      padding: 15px;
    }
    th.is-leaf,
    td {
      border-bottom: $--table-border;
    }
    .el-button--mini {
      padding: 5px 10px;
      margin:2px;
    }
  }
  .page-table-pagination {
    float: right;
    margin: 5px 30px 50px 0;
    /deep/.el-pagination__jump {
      margin-left: 0px;
    }
  }
}
</style>
