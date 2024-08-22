<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="资产名称" prop="assetName">
        <el-input
          v-model="queryParams.assetName"
          placeholder="请输入资产名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产类型" prop="assetType">
        <el-select
          v-model="queryParams.assetType"
          placeholder="请选择资产类型"
          clearable
        >
          <el-option
            v-for="dict in asset_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资产状态" prop="visible">
        <el-select
          v-model="queryParams.visible"
          placeholder="请选择资产状态"
          clearable
        >
          <el-option
            v-for="dict in asset_visible"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="vip类型" prop="vip">
        <el-select
          v-model="queryParams.vip"
          placeholder="请选择vip类型"
          clearable
        >
          <el-option
            v-for="dict in asset_vip"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['asset:asset:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll"
          >展开/折叠</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="assetList"
      row-key="assetId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="资产名称" prop="assetName" />
      <el-table-column
        label="资产类型"
        align="center"
        prop="assetType"
        width="80"
      >
        <template #default="scope">
          <dict-tag :options="asset_type" :value="scope.row.assetType" />
        </template>
      </el-table-column>
      <el-table-column
        label="父资产"
        align="center"
        prop="parentId"
        width="70"
      />
      <el-table-column
        label="资产状态"
        align="center"
        prop="visible"
        width="80"
      >
        <template #default="scope">
          <dict-tag :options="asset_visible" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column label="显示顺序" align="center" prop="sort" width="80" />
      <el-table-column label="vip类型" align="center" prop="vip" width="80">
        <template #default="scope">
          <dict-tag :options="asset_vip" :value="scope.row.vip" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" width="160" />
      <el-table-column
        label="创建时间"
        align="center"
        width="160"
        prop="createTime"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="210"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['asset:asset:edit']"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            icon="Plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['asset:asset:add']"
            >新增</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['asset:asset:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改资产数据对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="assetRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="资产名称" prop="assetName">
          <el-input v-model="form.assetName" placeholder="请输入资产名称" />
        </el-form-item>
        <el-form-item label="资产类型" prop="assetType">
          <el-select v-model="form.assetType" placeholder="请选择资产类型">
            <el-option
              v-for="dict in asset_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父资产" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="assetOptions"
            :props="{
              value: 'assetId',
              label: 'assetName',
              children: 'children',
            }"
            value-key="assetId"
            placeholder="请选择父资产"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="资产文件" prop="url">
          <file-upload v-model="form.url" :fileType="['pdf', 'asc']" />
        </el-form-item>
        <el-form-item label="资产状态" prop="visible">
          <el-select v-model="form.visible" placeholder="请选择资产状态">
            <el-option
              v-for="dict in asset_visible"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="vip类型" prop="vip">
          <el-select v-model="form.vip" placeholder="请选择vip类型">
            <el-option
              v-for="dict in asset_vip"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示顺序" prop="sort">
          <el-input-number v-model="form.sort" placeholder="请输入显示顺序" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Asset">
import {
  listAsset,
  getAsset,
  delAsset,
  addAsset,
  updateAsset,
} from "@/api/asset/asset";

const { proxy } = getCurrentInstance();
const { asset_type, asset_visible, asset_vip } = proxy.useDict(
  "asset_type",
  "asset_visible",
  "asset_vip"
);

const assetList = ref([]);
const assetOptions = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const isExpandAll = ref(true);
const refreshTable = ref(true);

const data = reactive({
  form: {},
  queryParams: {
    assetName: null,
    assetType: null,
    visible: null,
    vip: null,
  },
  rules: {
    assetName: [
      { required: true, message: "资产名称不能为空", trigger: "blur" },
    ],
    assetType: [
      { required: true, message: "资产类型不能为空", trigger: "change" },
    ],
    parentId: [
      { required: true, message: "父资产不能为空", trigger: "change" },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询资产数据列表 */
function getList() {
  loading.value = true;
  listAsset(queryParams.value).then((response) => {
    assetList.value = proxy.handleTree(
      response.data.sort((a, b) => a.sort - b.sort),
      "assetId",
      "parentId"
    );
    loading.value = false;
  });
}

/** 查询资产数据下拉树结构 */
function getTreeselect() {
  listAsset().then((response) => {
    assetOptions.value = [];
    const data = { assetId: 0, assetName: "顶级节点", children: [] };
    data.children = proxy.handleTree(response.data, "assetId", "parentId");
    assetOptions.value.push(data);
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    assetId: null,
    assetName: null,
    assetType: "DIR",
    parentId: null,
    visible: 0,
    sort: null,
    vip: 0,
    url: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
  };
  proxy.resetForm("assetRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 新增按钮操作 */
function handleAdd(row) {
  reset();
  getTreeselect();
  if (row != null && row.assetId) {
    form.value.parentId = row.assetId;
  } else {
    form.value.parentId = 0;
  }
  open.value = true;
  title.value = "添加资产数据";
}

/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  await getTreeselect();
  if (row != null) {
    form.value.parentId = row.parentId;
  }
  getAsset(row.assetId).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改资产数据";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["assetRef"].validate((valid) => {
    if (valid) {
      if (form.value.assetId != null) {
        updateAsset(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addAsset(form.value).then((response) => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal
    .confirm('是否确认删除资产数据编号为"' + row.assetId + '"的数据项？')
    .then(function () {
      return delAsset(row.assetId);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

getList();
</script>
