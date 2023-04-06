<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="配置文件" prop="dataId">
        <el-input
            v-model="queryParams.dataId"
            placeholder="请输入配置文件"
            clearable
            style="width: 240px;"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文件类型" prop="type">
        <el-input
            v-model="queryParams.type"
            placeholder="请输入文件类型"
            clearable
            style="width: 240px;"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务名称" prop="cDesc">
        <el-input
            v-model="queryParams.cDesc"
            placeholder="请输入服务名称"
            clearable
            style="width: 240px;"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="operlogRef" v-loading="loading" :data="configurationList" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
      <el-table-column prop="cdesc" label="服务名称"></el-table-column>
      <el-table-column prop="dataId" label="配置文件" width="200"></el-table-column>
      <el-table-column prop="type" label="文档类型"></el-table-column>
      <el-table-column prop="srcUser" label="创建人"></el-table-column>
      <el-table-column label="服务分组" prop="groupId" width="200"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="gmtCreate" width="200">
        <template #default="scope">
          <span>{{ parseTime(scope.row.gmtCreate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="gmtModified" width="200">
        <template #default="scope">
          <span>{{ parseTime(scope.row.gmtModified) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:dept:edit']">修改</el-button>
          <el-button v-if="scope.row.parentId != 0" link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:dept:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />
  </div>
</template>

<script setup name="configuration">

import listConfiguration from "@/api/serviceConfig/configuration";

const { proxy } = getCurrentInstance();
const configurationList = ref([]);
const showSearch = ref(true);
const loading = ref(true);
const total = ref(0);
const defaultSort = ref({ prop: "operTime", order: "descending" });


const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    cdesc: undefined,
    dataId: undefined,
    type: undefined
  },
  rules: {
    parentId: [{ required: true, message: "上级部门不能为空", trigger: "blur" }],
    deptName: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
    orderNum: [{ required: true, message: "显示排序不能为空", trigger: "blur" }],
    email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phone: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }]
  },
});


const { queryParams, form, rules } = toRefs(data);

function handleSelectionChange(a,b,c) {
  console.log(a,b,c)
}

/** 排序触发事件 */
function handleSortChange(column, prop, order) {
  queryParams.value.orderByColumn = column.prop;
  queryParams.value.isAsc = column.order;
  getList();
}

/** 查询配置列表 */
function getList() {
  loading.value = true;
  listConfiguration(queryParams.value).then(response => {
    configurationList.value = response.records;
    total.value = response.total;
    loading.value = false;
  });
}

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  queryParams.value.pageNum = 1;
  proxy.$refs["operlogRef"].sort(defaultSort.value.prop, defaultSort.value.order);
}

/** 修改按钮操作 */
function handleUpdate(row) {
  console.log(row)
}

/** 删除按钮操作 */
function handleDelete(row) {
  console.log(row)
}

function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

getList();

</script>

<style scoped>

</style>