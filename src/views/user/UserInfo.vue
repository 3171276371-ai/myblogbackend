<template>
  <div class="goodsindex">
    <!-- 搜索条件 -->
    <el-row :gutter="20" class="goodsindex-queryInfo">
      <!-- 用户名字搜索 -->
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input
          class="goodsindex-queryInfo-li"
          v-model="queryInfo.name"
          clearable
          size="small"
          placeholder="请输入用户名称"
        ></el-input>
      </el-col>

      <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
        <el-button type="primary" class="goodsindex-queryInfo-li" size="small" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <!-- 检索结果 -->
    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="21">
        <el-table
          :data="tableData"
          border
          size="small"
          style="width: 100%"
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序号" width="146"></el-table-column>
          <el-table-column prop="account" label="用户名" width="200"></el-table-column>
          <el-table-column prop="name" label="姓名" width="200"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80"></el-table-column>
          <el-table-column prop="phone" label="电话" width="200"></el-table-column>
          <el-table-column prop="isEnable" label="启停状态" width="80"></el-table-column>
          <el-table-column prop="avatar" label="头像地址" width="232"></el-table-column>
          <el-table-column prop="authData" label="权限" width="320"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    
    <!-- 分页 -->
    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="24" class="goodsindex-page-box">
        <el-pagination
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryInfo.totalNum"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      queryInfo: {
        name: "",
        type: "",
        page: 1,
        pageSize: 5,
        totalNum: 15
      }, 
      options: [
        {
          label: 1,
          value: "安心蔬菜"
        },
        {
          label: 2,
          value: "新鲜牛奶"
        }
      ],
      tableData: []
    };
  },
  created() {
    this.getuserInfo();
  },
  methods: {
    handleSelectionChange(val) {
      this.checkIds = val;
      // this.checkIds.map(items=>{return item.id}).join(',')
      //  console.log(this.checkIds.map(tableData=>{return tableData.id}).join(',').split(','))
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val;
      this.getuserInfo();
    },
    // 页码改变后查询处理
    handleCurrentChange(val) {
      this.queryInfo.page = val;
      this.getuserInfo();
    },
    search() {
      this.getuserInfo();
    },
     
    getuserInfo() {
      this.$axios
        .get("blogAdmin/findAll", {
          params: {
            name: this.queryInfo.name,
            pageSize: this.queryInfo.pageSize,
            pageNum: this.queryInfo.page
          },
          headers: { Authorization: this.$cookie.get("token") }
        })
        .then(res => {
          this.tableData = res.data.data.records;
          for (let i in this.tableData) {
            if (this.tableData[i].sex == 0) {
              this.tableData[i].sex = "男";
            } else if (this.tableData[i].sex == 1) {
              this.tableData[i].sex = "女";
            } else {
              this.tableData[i].sex = "未知";
            }
          }
          this.queryInfo.totalNum = res.data.data.total;
        });
    }
  }
};
</script>

<style scoped>
.goodsindex {
  width: 100%;
  min-height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
/* 搜索 */
.goodsindex-queryInfo {
  margin-bottom: 10px;
}
.goodsindex-queryInfo-li {
  width: 100%;
  height: auto;
}
/* 列表 */
.goodsindex-list {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}
/* 分页 */
.goodsindex-page-box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
}
</style>