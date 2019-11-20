<template>
  <section class="main-table">
    <div class="table-list">
      <el-table
        highlight-current-row
        stripe
        border
        size="small"
        v-loading="mainLoading"
        cell-class-name="table-cell"
        header-cell-class-name="header-cell"
        @sort-change="sortChange"
        @select="selectEvt"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @current-change="handleCurrentChange"
        :data="tableData"
      >
        <!-- 序号 -->
        <el-table-column
          v-if="showIndex"
          fixed="left"
          type="index"
          :index="indexMethod"
          align="center"
          label="序号"
          :width="100"
        >
          <span slot="header"></span>
        </el-table-column>

        <!-- 多选 -->
        <el-table-column v-if="showSelect" type="selection" width="55" prop="checked"></el-table-column>

        <template v-for="tableItem in columns">
          <el-table-column
            v-if="!tableItem.isHide"
            :fixed="tableItem.fixed"
            :key="tableItem.prop"
            :label="tableItem.label"
            :min-width="tableItem.width"
            :show-overflow-tooltip="tableItem.showOverflowTooltip"
            :sortable="!!tableItem.sortable"
            :formatter="typeof tableItem.formatter === 'function' ?
              ((row, column, cellValue, index) => {
                return tableItem.formatter(enumData, row, column, cellValue, index)
              }) : null"
            :prop="tableItem.prop"
          ></el-table-column>
        </template>

        <el-table-column
          v-if="showOperateColumn"
          class="operate-column"
          :width="operateColumnWidth"
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              v-for="btnItem in btnList"
              :key="btnItem.name"
              @click="btnClick(btnItem.name, scope.$index, scope.row)"
            >{{btnItem.name}}</el-button>
            <slot :scope="scope"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 如果将分页也放进上面的section会造成flex下方表格高度错乱 -->
    <div class="pagination" v-if="showPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    mainLoading: {
      default: false,
      type: Boolean
    },
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    operateColumnWidth: {
      type: String,
      default: "300"
    },
    total: {
      type: Number
    },
    defaultSort: {
      type: String
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    showOperateColumn: {
      type: Boolean,
      default: false
    },
    btnList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // btnList: [],
      page: {
        pageSize: 20,
        pageNum: 1,
        sort: this.defaultSort
      },
      enumData: ""
    };
  },
  computed: {
    // ...mapGetters('layout', ['getButtonList']),
    // ...mapState('commonData' ,['enumData'])
  },
  created() {},
  methods: {
    indexMethod(index) {
      return (this.page.pageNum - 1) * this.page.pageSize + index + 1;
    },
    btnClick(name, index, row) {
      this.$emit("operateBtnClick", name, index, row);
    },
    sortChange({ column, prop, order }) {
      let sort = "";
      if (prop !== null) {
        let itemOrder = order === "ascending" ? true : false;
        sort = itemOrder ? `${prop} asc` : `${prop} desc`;
      } else {
        sort = this.defaultSort;
      }
      this.page.sort = sort;
      this.$emit("queryList", this.page);
    },

    handleSizeChange(val) {
      this.page.pageSize = val;
      delete this.page.sort;
      this.$emit("queryList", this.page);
    },
    handleCurrentPageChange(val) {
      this.page.pageNum = val;
      delete this.page.sort;
      this.$emit("queryList", this.page);
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      // console.log('currentRow', currentRow);
      // console.log('oldCurrentRow', oldCurrentRow);
    },
    selectEvt(selection, row) {
      // 设置一个标识
      if (row.checked) {
        row.checked = false
      } else {
        row.checked = true
      }
    },
    selectAll(selectedArr) {
      let isSelectAll = Object.keys(selectedArr).length > 0;
      selectedArr.forEach(item => {
        item.checked = true;
      });
      this.$emit("selectAll", isSelectAll, selectedArr);
    },
    selectionChange(selection) {
      this.$emit("selectionChange", selection);
    },


  }
};
</script>

<style lang="scss" scoped>
.main-table {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-list {
  flex: 1;
  .table-container {
    height: 100%;
    font-size: 13px;
  }

  /deep/ .el-table {
    th {
      padding: 0;
      .cell {
        white-space: nowrap;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 45px;
      }
    }

    .table-cell,
    .header-cell {
      &:first-child {
        text-align: center;
      }
    }
  }

  /deep/ .el-table th div {
    line-height: 23px;
  }
}

.pagination {
  text-align: right;
  margin: 10px 10px 10px 0;
}
</style>
