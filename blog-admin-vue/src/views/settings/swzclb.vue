<template>
  <div class="bmgl">
    <el-form :inline="true" :model="queryFrom">
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" v-permission="'swzclb_add'" @click="isEdit = true;modalShow=true">添加类别</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column prop="lbbm" label="类别编码"></el-table-column>
      <el-table-column prop="lbmc" label="类别名称"></el-table-column>
      <el-table-column prop="xxbd" label="信息表单"></el-table-column>
      <el-table-column prop="address" label="操作" width="220">
        <template slot-scope="scope">
          <el-button plain size="mini" type="success" @click="btn_detail(scope.row)">查看</el-button>
          <el-button plain size="mini" type="warning" v-permission="'swzclb_edit'" @click="btn_detail(scope.row,'edit')">修改</el-button>
          <el-button plain size="mini" type="danger" v-permission="'swzclb_del'" @click="btn_del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageObj.pageNo" :page-size="pageObj.pageSize" layout="total, prev, pager, next" :total="pageObj.totalCount"></el-pagination>
    <xModal :modalShow="modalShow" :data=data :isEdit="isEdit" @close="close" @edit="btn_search"></xModal>
  </div>
</template>
<script>
import { getLb, delLb } from "@/api/settings/swzclb";
import xModal from "./swzclb_modal";
export default {
  name: "swzclb",
  components: {
    xModal
  },
  data() {
    return {
      queryFrom: {},
      pageObj: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      data: {},
      modalShow: false,
      tableData: [],
      isEdit: false
    };
  },
  methods: {
    indexMethod(index) {
      let start = (this.pageObj.pageNo - 1) * this.pageObj.pageSize;
      return start + index + 1;
    },
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.btn_search();
      });
    },
    handleRes(res, type) {
      let data = res.data;
      if (data.success) {
        this.$message({
          message: data.msg,
          type: "success"
        });
        this.btn_search();
      } else {
        this.$message({
          message: data.msg
        });
      }
    },
    close() {
      this.data = {};
      this.isEdit = false;
      this.modalShow = false;
    },
    btn_detail(row, edit) {
      this.data = row;
      if (edit) {
        this.isEdit = true;
      }
      this.modalShow = true;
    },
    btn_search(pageNo) {
      if (pageNo) {
        this.pageObj.pageNo = pageNo;
      }
      let obj = Object.assign({}, this.queryFrom, this.pageObj);
      getLb(obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.tableData = data.msg.data;
          this.pageObj.totalCount = data.msg.totalCount;
        }
      });
    },
    btn_del(row) {
      this.$confirm("你确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delLb(row.id).then(res => {
            this.handleRes(res);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.btn_search();
  }
};
</script>
