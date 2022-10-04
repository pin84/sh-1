<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="货号名称" prop="productStyleName">
        <el-input
          v-model="queryParams.productStyleName"
          placeholder="请输入货号名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="测试样" prop="testSample">
        <el-input
          v-model="queryParams.testSample"
          placeholder="请输入测试样"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="船样" prop="shippingSample">
        <el-input
          v-model="queryParams.shippingSample"
          placeholder="请输入船样"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否授权品牌" prop="isAuthbrand">
        <el-select v-model="queryParams.isAuthbrand" placeholder="请选择是否授权品牌" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投产及封样状态" prop="fenyangStatus">
        <el-select v-model="queryParams.fenyangStatus" placeholder="请选择投产及封样状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="确认样进度" prop="confirmSampleSchedule">
        <el-input
          v-model="queryParams.confirmSampleSchedule"
          placeholder="请输入确认样进度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年份季节" prop="yearAndSeason">
        <el-input
          v-model="queryParams.yearAndSeason"
          placeholder="请输入年份季节"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:productstyle:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:productstyle:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:productstyle:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:productstyle:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="productstyleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="productStyleId" />
      <el-table-column label="货号名称" align="center" prop="productStyleName" />
      <el-table-column label="测试样" align="center" prop="testSample" />
      <el-table-column label="船样" align="center" prop="shippingSample" />
      <el-table-column label="是否授权品牌" align="center" prop="isAuthbrand">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isAuthbrand"/>
        </template>
      </el-table-column>
      <el-table-column label="投产及封样状态" align="center" prop="fenyangStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.fenyangStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="确认样进度" align="center" prop="confirmSampleSchedule" />
      <el-table-column label="年份季节" align="center" prop="yearAndSeason" />
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新者" align="center" prop="updateBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:productstyle:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:productstyle:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改货品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="货号名称" prop="productStyleName">
          <el-input v-model="form.productStyleName" placeholder="请输入货号名称" />
        </el-form-item>
        <el-form-item label="测试样" prop="testSample">
          <el-input v-model="form.testSample" placeholder="请输入测试样" />
        </el-form-item>
        <el-form-item label="船样" prop="shippingSample">
          <el-input v-model="form.shippingSample" placeholder="请输入船样" />
        </el-form-item>
        <el-form-item label="是否授权品牌">
          <el-radio-group v-model="form.isAuthbrand">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="投产及封样状态">
          <el-radio-group v-model="form.fenyangStatus">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="确认样进度" prop="confirmSampleSchedule">
          <el-input v-model="form.confirmSampleSchedule" placeholder="请输入确认样进度" />
        </el-form-item>
        <el-form-item label="年份季节" prop="yearAndSeason">
          <el-input v-model="form.yearAndSeason" placeholder="请输入年份季节" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listProductstyle, getProductstyle, delProductstyle, addProductstyle, updateProductstyle } from "@/api/system/productstyle";

export default {
  name: "Productstyle",
  dicts: ['sys_yes_no'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 货品表格数据
      productstyleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productStyleName: null,
        testSample: null,
        shippingSample: null,
        isAuthbrand: null,
        fenyangStatus: null,
        confirmSampleSchedule: null,
        yearAndSeason: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询货品列表 */
    getList() {
      this.loading = true;
      listProductstyle(this.queryParams).then(response => {
        this.productstyleList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        productStyleId: null,
        productStyleName: null,
        testSample: null,
        shippingSample: null,
        isAuthbrand: "0",
        fenyangStatus: "0",
        confirmSampleSchedule: null,
        yearAndSeason: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.productStyleId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加货品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const productStyleId = row.productStyleId || this.ids
      getProductstyle(productStyleId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改货品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.productStyleId != null) {
            updateProductstyle(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProductstyle(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const productStyleIds = row.productStyleId || this.ids;
      this.$modal.confirm('是否确认删除货品编号为"' + productStyleIds + '"的数据项？').then(function() {
        return delProductstyle(productStyleIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/productstyle/export', {
        ...this.queryParams
      }, `productstyle_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
