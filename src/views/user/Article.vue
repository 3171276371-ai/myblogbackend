<template>
  <div class="goodsindex">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
       :filter-node-method="filterNode"
       class="filter-tree"
    ></el-tree>
 
    <!-- 检索结果 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        }
      ],
      defaultProps: {
        children: "detshare",
        label: "name",
        id: "id"
      },

      queryInfo: {
        name: "",
        type: "",
        page: 1,
        pageSize: 5,
        totalNum: 15
      },
      tableData: []
    };
  },
  watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  created() {
    this.getArticleInfo();
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1"
        },
        {
          id: 9,
          label: "三级 1-1-1"
        }
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
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
    getArticleInfo() {
      let url = "/blogArticleClass/ArtClassData";
      this.$axios.get(url).then(num => {
        // console.log(num);
        if (num.data.code == 200) {
          this.data = num.data.data;
          this.queryInfo.totalNum = num.data.data.length;
          console.log(this.data);
          console.log(this.queryInfo.totalNum);
        } else {
          alert("查询失败");
        }
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