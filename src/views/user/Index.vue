<template>
  <div class="goodsindex">
    <!-- 搜索条件 -->
    <el-row :gutter="20" class="goodsindex-queryInfo">
      <!-- 商品名称搜索 -->
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input
          class="goodsindex-queryInfo-li"
          v-model="queryInfo.permissionName"
          clearable
          size="small"
          placeholder="请输入权限名称"
        ></el-input>
      </el-col>
      <!-- 商品分类搜索 -->

      <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
        <el-button type="primary" class="goodsindex-queryInfo-li" size="small" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <div class="Information-title">
      <el-button type="danger" size="small" @click="delall">删除</el-button>
      <el-button type="primary" class="Ad-Info-li" size="small" @click="PlacardShow = true">添加</el-button>
    </div>
    <div class="Information-table">
      <el-row :gutter="20" class="goodsindex-list">
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            size="small"
            style="width: 100%"
            ref="multipleTable"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="用户id" width="180"></el-table-column>
            <el-table-column prop="permissionName" label="权限名称" width="140"></el-table-column>
            <el-table-column prop="value" label="权限编码" width="100"></el-table-column>
            <el-table-column prop="type" label="权限类型" width="100"></el-table-column>
            <el-table-column prop="path" label="前端路由" width="200"></el-table-column>
            <el-table-column prop="meta" label="元数据" width="144"></el-table-column>
            <el-table-column prop="name" label="路由名称" width="110"></el-table-column>
            <el-table-column prop="component" label="组件路由" width="150"></el-table-column>
            <el-table-column prop="redirect" label="重定向路由" width="160"></el-table-column>
            <el-table-column prop="ban" label="是否被禁用" width="110"></el-table-column>
            <el-table-column prop="sort" label="菜单排序" width="120"></el-table-column>
            <el-table-column primary="primary" label="操作" width="100"> 
                <el-button type="primary" class="Ad-Info-li" size="small" @click="Placardedit = true">编辑</el-button>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog title="添加权限" :visible.sync="PlacardShow">
        <el-form :model="PlacardForm" :rules="PlacardRules" ref="PlacardForm">
          <el-form-item label="父级权限ID" :label-width="PlacardWidth" prop="parentId">
            <el-input v-model="PlacardForm.parentId" autocomplete="off" placeholder="请输入父级权限ID"></el-input>
          </el-form-item>
          <el-form-item label="权限名称" :label-width="PlacardWidth" prop="permissionName">
            <el-input v-model="PlacardForm.permissionName" autocomplete="off" placeholder="请输入权限名称"></el-input>
          </el-form-item>
          <el-form-item label="权限编码" :label-width="PlacardWidth" prop="value">
            <el-input v-model="PlacardForm.value" autocomplete="off" placeholder="请输入权限编码"></el-input>
          </el-form-item>
          <el-form-item label="权限类型" :label-width="PlacardWidth" prop="type">
            <el-input v-model="PlacardForm.type" autocomplete="off" placeholder="请输入权限类型"></el-input>
          </el-form-item>
          <el-form-item label="元数据" :label-width="PlacardWidth" prop="meta">
            <el-input v-model="PlacardForm.meta" autocomplete="off" placeholder="请输入元数据"></el-input>
          </el-form-item>
          <el-form-item label="前端路由路径" :label-width="PlacardWidth" prop="path">
            <el-input v-model="PlacardForm.path" autocomplete="off" placeholder="请输入前端路由路径"></el-input>
          </el-form-item>
          <el-form-item label="路由名称" :label-width="PlacardWidth" prop="name">
            <el-input v-model="PlacardForm.name" autocomplete="off" placeholder="请输入路由名称"></el-input>
          </el-form-item>
          <el-form-item label="组件路径" :label-width="PlacardWidth" prop="component">
            <el-input v-model="PlacardForm.component" autocomplete="off" placeholder="请输入组件路径"></el-input>
          </el-form-item>
          <el-form-item label="重定向路径" :label-width="PlacardWidth" prop="redirect">
            <el-input v-model="PlacardForm.redirect" autocomplete="off" placeholder="请输入重定向路径"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="PlacardSubmit('PlacardForm')" type="primary">添 加</el-button>
        </div>
      </el-dialog>
       <el-dialog title="修改权限" :visible.sync="Placardedit">
        <el-form :model="PlacardForm" :rules="PlacardRules" ref="PlacardForm">
          <el-form-item label="权限ID" :label-width="PlacardWidth" prop="id">
            <el-input v-model="PlacardForm.id" autocomplete="off" placeholder="请输入权限ID"></el-input>
          </el-form-item>
          <el-form-item label="父级权限ID" :label-width="PlacardWidth" prop="parentId">
            <el-input v-model="PlacardForm.parentId" autocomplete="off" placeholder="请输入父级权限ID"></el-input>
          </el-form-item>
          <el-form-item label="权限编码" :label-width="PlacardWidth" prop="value">
            <el-input v-model="PlacardForm.value" autocomplete="off" placeholder="请输入权限编码"></el-input>
          </el-form-item>
          <el-form-item label="权限名称" :label-width="PlacardWidth" prop="permissionName">
            <el-input v-model="PlacardForm.permissionName" autocomplete="off" placeholder="请输入权限名称"></el-input>
          </el-form-item>
          <el-form-item label="权限类型" :label-width="PlacardWidth" prop="type">
            <el-input v-model="PlacardForm.type" autocomplete="off" placeholder="请输入权限类型"></el-input>
          </el-form-item>
          <el-form-item label="元数据" :label-width="PlacardWidth" prop="meta">
            <el-input v-model="PlacardForm.meta" autocomplete="off" placeholder="请输入元数据"></el-input>
          </el-form-item>
          <el-form-item label="前端路由路径" :label-width="PlacardWidth" prop="path">
            <el-input v-model="PlacardForm.path" autocomplete="off" placeholder="请输入前端路由路径"></el-input>
          </el-form-item>
          <el-form-item label="路由名称" :label-width="PlacardWidth" prop="name">
            <el-input v-model="PlacardForm.name" autocomplete="off" placeholder="请输入路由名称"></el-input>
          </el-form-item>
          <el-form-item label="组件路径" :label-width="PlacardWidth" prop="component">
            <el-input v-model="PlacardForm.component" autocomplete="off" placeholder="请输入组件路径"></el-input>
          </el-form-item>
          <el-form-item label="重定向路径" :label-width="PlacardWidth" prop="redirect">
            <el-input v-model="PlacardForm.redirect" autocomplete="off" placeholder="请输入重定向路径"></el-input>
          </el-form-item>
            <el-form-item label="是否被禁用" :label-width="PlacardWidth" prop="ban">
            <el-input v-model="PlacardForm.ban" autocomplete="off" placeholder="请输入是否禁用"></el-input>
          </el-form-item>
             <el-form-item label="是否菜单排序" :label-width="PlacardWidth" prop="sort">
            <el-input v-model="PlacardForm.sort" autocomplete="off" placeholder="请输入是否排序"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="PlacardSubmitEdit('PlacardForm')" type="primary">添 加</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 检索结果 -->

    <!-- 分页 -->
    <el-row :gutter="20" class="goodsindex-list">
      <el-col :span="24" class="goodsindex-page-box">
        <el-pagination
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[5, 10, 20, 30]"
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
  inject: ["reload"],
  data() {
    var validatelinl = (rule, value, callback) => {
      let linlRG = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
      if (value === "") {
        callback(new Error("请输入链接地址"));
      } else if (!linlRG.test(value)) {
        callback(new Error("请输入正确的网址"));
      } else {
        callback();
      }
    };
    return {
      queryInfo: {
        permissionName: "",
        type: "",
        page: 1,
        pageSize: 10,
        totalNum: 15
      },
      PlacardRules: {
        id: [
          { required: true, message: "请输入权限ID", trigger: "blur" },
          { min: 2, max: 19, message: "权限ID不能为空", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "请输入父级权限ID", trigger: "blur" },
          { min: 2, max: 19, message: "父权限ID不能为空", trigger: "blur" }
        ],
        permissionName: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
          { min: 1, max: 20, message: "权限中文名称不能为空", trigger: "blur" }
        ],
        value: [
          { required: true, message: "请输入权限编码", trigger: "blur" },
          { min: 1, max: 20, message: "权限编码不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入权限类型", trigger: "blur" },
          {
            min: 1,
            max: 1,
            message: "权限类型不能为空 0->目录；1->菜单；2->按钮",
            trigger: "blur"
          }
        ]
      },
      tableData: [],
      checkIds: {},
      PlacardWidth: "120px",
      PlacardShow: false,
      Placardedit:false,
      PlacardForm: {
        id:"",
        parentId: "",
        permissionName: "",
        value: "",
        type: "",
        meta: "",
        path: "",
        name: "",
        component: "",
        redirect: "",
        ban:"",
        sort:""
      }
    };
  },
  created() {
    this.getpermission();
  },
  methods: {
    handleSelectionChange(val) {
      this.checkIds = val;
      // this.checkIds.map(items=>{return item.id}).join(',')
      //  console.log(this.checkIds.map(tableData=>{return tableData.id}).join(',').split(','))
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val;
      this.getpermission();
    },
    // 页码改变后查询处理
    handleCurrentChange(val) {
      this.queryInfo.page = val;
      this.getpermission();
    },
    PlacardSubmitEdit(formName){
      this.$axios
        .put(
          "blogPermission",
          {
            id:this.PlacardForm.id,
            parentId: this.PlacardForm.parentId,
            permissionName: this.PlacardForm.permissionName,
            value: this.PlacardForm.value,
            type: this.PlacardForm.type,
            meta: this.PlacardForm.meta,
            path: this.PlacardForm.path,
            name: this.PlacardForm.name,
            component: this.PlacardForm.component,
            redirect: this.PlacardForm.redirect,
            ban:this.PlacardForm.ban,
            sort:this.PlacardForm.sort
          },
          {
            headers: { Authorization: this.$cookie.get("token") }
          }
        )
        .then(resp => {
          this.reload();
        })
        .catch(err => {
          alert("输入内容有误，无法提交");
          (this.PlacardForm.id = "");
          (this.PlacardForm.parentId = ""),
            (this.PlacardForm.permissionName = ""),
            (this.PlacardForm.value = ""),
            (this.PlacardForm.type = ""),
            (this.PlacardForm.meta = ""),
            (this.PlacardForm.path = ""),
            (this.PlacardForm.name = ""),
            (this.PlacardForm.component = ""),
            (this.PlacardForm.redirect = "");
            (this.PlacardForm.sort = "");
            (this.PlacardForm.ban = "");
        });
    },
    PlacardSubmit(formName) {
      this.$axios
        .post(
          "blogPermission",
          {
            parentId: this.PlacardForm.parentId,
            permissionName: this.PlacardForm.permissionName,
            value: this.PlacardForm.value,
            type: this.PlacardForm.type,
            meta: this.PlacardForm.meta,
            path: this.PlacardForm.path,
            name: this.PlacardForm.name,
            component: this.PlacardForm.component,
            redirect: this.PlacardForm.redirect
          },
          {
            headers: { Authorization: this.$cookie.get("token") }
          }
        )
        .then(resp => {
          this.reload();
        })
        .catch(err => {
          alert("输入内容有误，无法提交");
          (this.PlacardForm.parentId = ""),
            (this.PlacardForm.permissionName = ""),
            (this.PlacardForm.value = ""),
            (this.PlacardForm.type = ""),
            (this.PlacardForm.meta = ""),
            (this.PlacardForm.path = ""),
            (this.PlacardForm.name = ""),
            (this.PlacardForm.component = ""),
            (this.PlacardForm.redirect = "");
        });
    },
    search() {
      this.getpermission();
    },
    delShow(val) {},
    delall() {
      this.$axios
        .post(
          "blogPermission/delete",
          {
            permissionId: this.checkIds
              .map(tableData => {
                return tableData.id;
              })
              .join(",")
              .split(",")
          },
          {
            headers: { Authorization: this.$cookie.get("token") }
          }
        )
        .then(res => {
          this.reload();
        });
    },
    getpermission() {
      this.$axios
        .get("blogPermission/list", {
          params: {
            name: this.queryInfo.permissionName,
            pageSize: this.queryInfo.pageSize,
            pageNum: this.queryInfo.page
          },
          headers: { Authorization: this.$cookie.get("token") }
        })
        .then(res => {
          this.tableData = res.data.data.records;
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
.Placard {
  width: 100%;
  min-height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.Placard-Info {
  width: 100%;
  margin-bottom: 15px;
}
.Placard-Info-li {
  width: 100%;
}
.Placard-list {
  width: 100%;
  margin-bottom: 20px;
}
.Placard-page-box {
  display: flex;
  justify-content: flex-end;
}
</style>