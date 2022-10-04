<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="98px">
      <el-form-item label="ID" prop="baozhuangId">
        <el-input
          v-model="queryParams.baozhuangId"
          placeholder="请输入ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="包装辅料名称" prop="baozhuangName">
        <el-input
          v-model="queryParams.baozhuangName"
          placeholder="请输入包装辅料名称"
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
          v-hasPermi="['system:baozhuang:add']"
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
          v-hasPermi="['system:baozhuang:edit']"
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
          v-hasPermi="['system:baozhuang:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:baozhuang:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="baozhuangList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="baozhuangId" />
      <el-table-column label="包装辅料名称" align="center" prop="baozhuangName" />
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
            v-hasPermi="['system:baozhuang:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:baozhuang:remove']"
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

    <!-- 添加或修改包装辅料对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="750px" height="400px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="包装辅料名称" prop="baozhuangName">
          <el-input v-model="form.baozhuangName" placeholder="请输入包装辅料名称" />
        </el-form-item>
        <el-form-item label="码段楦长对应表图片">
          <image-upload v-model="form.maduanduiyingbiaoPic"/>
        </el-form-item>
        <el-form-item label="码段楦长对应表说明" prop="maduanduiyingbiaoDesc">
          <el-input v-model="form.maduanduiyingbiaoDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否指定供应商">
          <el-radio-group v-model="form.maduanduiyingbiaoIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="码段指定供应商地址信息" prop="maduanduiyingbiaoGysDesc" v-show="form.maduanduiyingbiaoIsGys=='Y'">
          <el-input v-model="form.maduanduiyingbiaoGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="内里印刷转印图片">
          <image-upload v-model="form.neiliyinshuaPic"/>
        </el-form-item>
        <el-form-item label="内里印刷转印说明" prop="neiliyinshuaDesc">
          <el-input v-model="form.neiliyinshuaDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="内里印刷转印是否指定供应商">
          <el-radio-group v-model="form.neiliyinshuaIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内里印刷转印指定供应商地址信息" prop="neiliyinshuaGysDesc" v-show="form.neiliyinshuaIsGys=='Y'">
          <el-input v-model="form.neiliyinshuaGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="织唛标">
          <image-upload v-model="form.bubiaoPic"/>
        </el-form-item>
        <el-form-item label="织唛标" prop="bubiaoDesc">
          <el-input v-model="form.bubiaoDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="织唛标">
          <el-radio-group v-model="form.bubiaoIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="织唛标" prop="bubiaoGysDesc" v-show="form.bubiaoIsGys=='Y'">
          <el-input v-model="form.bubiaoGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="成份标图片">
          <image-upload v-model="form.chengfenbiaoPic"/>
        </el-form-item>
        <el-form-item label="成份标说明" prop="chengfenbiaoDesc">
          <el-input v-model="form.chengfenbiaoDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="成份标是否指定供应商">
          <el-radio-group v-model="form.chengfenbiaoIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="成份标供应商地址信息" prop="chengfenbiaoGysDesc" v-show="form.chengfenbiaoIsGys=='Y'">
          <el-input v-model="form.chengfenbiaoGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="常规吊牌图片">
          <image-upload v-model="form.changguidiaopaiPic"/>
        </el-form-item>
        <el-form-item label="常规吊牌说明" prop="changguidiaopaiDesc">
          <el-input v-model="form.changguidiaopaiDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="常规吊牌是否指定供应商">
          <el-radio-group v-model="form.changguidiaopaiIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="常规吊牌供应商地址信息" prop="changguidiaopaiGysDesc" v-show="form.changguidiaopaiIsGys=='Y'">
          <el-input v-model="form.changguidiaopaiGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="授权品牌吊牌图片">
          <image-upload v-model="form.shouquanpinpaiPic"/>
        </el-form-item>
        <el-form-item label="授权品牌吊牌说明" prop="shouquanpinpaiDesc">
          <el-input v-model="form.shouquanpinpaiDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="授权品牌吊牌是否指定供应商">
          <el-radio-group v-model="form.shouquanpinpaiIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="授权品牌吊牌供应商地址信息" prop="shouquanpinpaiGysDesc" v-show="form.shouquanpinpaiIsGys=='Y'">
          <el-input v-model="form.shouquanpinpaiGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="特殊吊牌图片">
          <image-upload v-model="form.teshudiaopaiPic"/>
        </el-form-item>
        <el-form-item label="特殊吊牌说明" prop="teshudiaopaiDesc">
          <el-input v-model="form.teshudiaopaiDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="特殊吊牌是否指定供应商">
          <el-radio-group v-model="form.teshudiaopaiIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="特殊吊牌供应商地址信息" prop="teshudiaopaiGysDesc" v-show="form.teshudiaopaiIsGys=='Y'">
          <el-input v-model="form.teshudiaopaiGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="结双绳图片">
          <image-upload v-model="form.jieshuangshengPic"/>
        </el-form-item>
        <el-form-item label="结双绳说明" prop="jieshuangshengDesc">
          <el-input v-model="form.jieshuangshengDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="结双绳是否指定供应商">
          <el-radio-group v-model="form.jieshuangshengIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结双绳供应商地址信息" prop="jieshuangshengGysDesc" v-show="form.jieshuangshengIsGys=='Y'">
          <el-input v-model="form.jieshuangshengGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="防霉类型图片">
          <image-upload v-model="form.fangmeiPic"/>
        </el-form-item>
        <el-form-item label="防霉类型说明" prop="fangmeiDesc">
          <el-input v-model="form.fangmeiDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="防霉类型是否指定供应商">
          <el-radio-group v-model="form.fangmeiIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="防霉类型供应商地址信息" prop="fangmeiGysDesc" v-show="form.fangmeiIsGys=='Y'">
          <el-input v-model="form.fangmeiGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="胶带图片">
          <image-upload v-model="form.jiaodaiPic"/>
        </el-form-item>
        <el-form-item label="胶带说明" prop="jiaodaiDesc">
          <el-input v-model="form.jiaodaiDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="胶带是否指定供应商">
          <el-radio-group v-model="form.jiaodaiIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="胶带供应商地址信息" prop="jiaodaiGysDesc" v-show="form.jiaodaiIsGys=='Y'">
          <el-input v-model="form.jiaodaiGysDesc" placeholder="请输入胶带供应商地址信息" />
        </el-form-item>
        <el-form-item label="胶袋贴图片" prop="jiaodaitiePic">
          <el-input v-model="form.jiaodaitiePic" placeholder="请输入胶袋贴图片" />
        </el-form-item>
        <el-form-item label="胶袋贴说明" prop="jiaodaitieDesc">
          <el-input v-model="form.jiaodaitieDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="胶袋贴是否指定供应商">
          <el-radio-group v-model="form.jiaodaitieIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="胶袋贴供应商地址信息" prop="jiaodaitieGysDesc" v-show="form.jiaodaitieIsGys=='Y'">
          <el-input v-model="form.jiaodaitieGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="内盒图片">
          <image-upload v-model="form.neihePic"/>
        </el-form-item>
        <el-form-item label="内盒说明" prop="neiheDesc">
          <el-input v-model="form.neiheDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="内盒是否指定供应商">
          <el-radio-group v-model="form.neiheIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内盒供应商地址信息" prop="neiheGysDesc" v-show="form.neiheIsGys=='Y'">
          <el-input v-model="form.neiheGysDesc" placeholder="请输入内盒供应商地址信息" />
        </el-form-item>
        <el-form-item label="内盒贴标图片" prop="neihetiebiaoPic">
          <el-input v-model="form.neihetiebiaoPic" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="内盒贴标说明" prop="neihetiebiaoDesc">
          <el-input v-model="form.neihetiebiaoDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="内盒贴标是否指定供应商">
          <el-radio-group v-model="form.neihetiebiaoIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内盒贴标供应商地址信息" prop="neihetiebiaoGysDesc" v-show="form.neihetiebiaoIsGys=='Y'">
          <el-input v-model="form.neihetiebiaoGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="产地标图片">
          <image-upload v-model="form.chandibiaoPic"/>
        </el-form-item>
        <el-form-item label="产地标说明" prop="chandibiaoDesc">
          <el-input v-model="form.chandibiaoDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="产地标是否指定供应商">
          <el-radio-group v-model="form.chandibiaoIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产地标供应商地址信息" prop="chandibiaoGysDesc" v-show="form.chandibiaoIsGys=='Y'">
          <el-input v-model="form.chandibiaoGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="防盗标图片">
          <image-upload v-model="form.fangdaobiaoPic"/>
        </el-form-item>
        <el-form-item label="防盗标说明" prop="fangdaobiaoDesc">
          <el-input v-model="form.fangdaobiaoDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="防盗标是否指定供应商">
          <el-radio-group v-model="form.fangdaobiaoIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="防盗标供应商地址信息" prop="fangdaobiaoGysDesc" v-show="form.fangdaobiaoIsGys=='Y'">
          <el-input v-model="form.fangdaobiaoGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="softTag图片">
          <image-upload v-model="form.softtagPic"/>
        </el-form-item>
        <el-form-item label="softTag说明" prop="softtagDesc">
          <el-input v-model="form.softtagDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="softTag是否指定供应商">
          <el-radio-group v-model="form.softtagIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="softTag供应商地址信息" prop="softtagGysDesc" v-show="form.softtagIsGys=='Y'">
          <el-input v-model="form.softtagGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="外箱图片">
          <image-upload v-model="form.waixiangPic"/>
        </el-form-item>
        <el-form-item label="外箱说明" prop="waixiangDesc">
          <el-input v-model="form.waixiangDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="外箱是否指定供应商">
          <el-radio-group v-model="form.waixiangIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="外箱供应商地址信息" prop="waixiangGysDesc" v-show="form.waixiangIsGys=='Y'">
          <el-input v-model="form.waixiangGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="外箱贴图片">
          <image-upload v-model="form.waixiangtiePic"/>
        </el-form-item>
        <el-form-item label="外箱贴说明" prop="waixiangtieDesc">
          <el-input v-model="form.waixiangtieDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="外箱贴是否指定供应商">
          <el-radio-group v-model="form.waixiangtieIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="外箱贴供应商地址信息" prop="waixiangtieGysDesc" v-show="form.waixiangtieIsGys=='Y'">
          <el-input v-model="form.waixiangtieGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="挂钩图片">
          <image-upload v-model="form.guagouPic"/>
        </el-form-item>
        <el-form-item label="挂钩说明" prop="guagouDesc">
          <el-input v-model="form.guagouDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="挂钩是否指定供应商">
          <el-radio-group v-model="form.guagouIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂钩供应商地址信息" prop="guagouGysDesc" v-show="form.guagouIsGys=='Y'">
          <el-input v-model="form.guagouGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="挂钩贴图片">
          <image-upload v-model="form.guagoutiePic"/>
        </el-form-item>
        <el-form-item label="挂钩贴说明" prop="guagoutieDesc">
          <el-input v-model="form.guagoutieDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="挂钩贴是否指定供应商">
          <el-radio-group v-model="form.guagoutieIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="挂钩贴供应商地址信息" prop="guagoutieGysDesc" v-show="form.guagoutieIsGys=='Y'">
          <el-input v-model="form.guagoutieGysDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="拷贝纸图片">
          <image-upload v-model="form.kaobeizhiPic"/>
        </el-form-item>
        <el-form-item label="拷贝纸说明" prop="kaobeizhiDesc">
          <el-input v-model="form.kaobeizhiDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="拷贝纸是否指定供应商">
          <el-radio-group v-model="form.kaobeizhiIsGys">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="拷贝纸供应商地址信息" prop="kaobeizhiGysDesc" v-show="form.kaobeizhiIsGys=='Y'">
          <el-input v-model="form.kaobeizhiGysDesc" type="textarea" placeholder="请输入内容" />
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
import { listBaozhuang, getBaozhuang, delBaozhuang, addBaozhuang, updateBaozhuang } from "@/api/system/baozhuang";

export default {
  name: "Baozhuang",
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
      // 包装辅料表格数据
      baozhuangList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        baozhuangId: null,
        baozhuangName: null,
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
    /** 查询包装辅料列表 */
    getList() {
      this.loading = true;
      listBaozhuang(this.queryParams).then(response => {
        this.baozhuangList = response.rows;
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
        baozhuangId: null,
        baozhuangName: null,
        maduanduiyingbiaoPic: null,
        maduanduiyingbiaoDesc: null,
        maduanduiyingbiaoIsGys: "N",
        maduanduiyingbiaoGysDesc: null,
        neiliyinshuaPic: null,
        neiliyinshuaDesc: null,
        neiliyinshuaIsGys:"N",
        neiliyinshuaGysDesc: null,
        bubiaoPic: null,
        bubiaoDesc: null,
        bubiaoIsGys:"N",
        bubiaoGysDesc: null,
        chengfenbiaoPic: null,
        chengfenbiaoDesc: null,
        chengfenbiaoIsGys:"N",
        chengfenbiaoGysDesc: null,
        changguidiaopaiPic: null,
        changguidiaopaiDesc: null,
        changguidiaopaiIsGys:"N",
        changguidiaopaiGysDesc: null,
        shouquanpinpaiPic: null,
        shouquanpinpaiDesc: null,
        shouquanpinpaiIsGys:"N",
        shouquanpinpaiGysDesc: null,
        teshudiaopaiPic: null,
        teshudiaopaiDesc: null,
        teshudiaopaiIsGys:"N",
        teshudiaopaiGysDesc: null,
        jieshuangshengPic: null,
        jieshuangshengDesc: null,
        jieshuangshengIsGys:"N",
        jieshuangshengGysDesc: null,
        fangmeiPic: null,
        fangmeiDesc: null,
        fangmeiIsGys:"N",
        fangmeiGysDesc: null,
        jiaodaiPic: null,
        jiaodaiDesc: null,
        jiaodaiIsGys:"N",
        jiaodaiGysDesc: null,
        jiaodaitiePic: null,
        jiaodaitieDesc: null,
        jiaodaitieIsGys:"N",
        jiaodaitieGysDesc: null,
        neihePic: null,
        neiheDesc: null,
        neiheIsGys:"N",
        neiheGysDesc: null,
        neihetiebiaoPic: null,
        neihetiebiaoDesc: null,
        neihetiebiaoIsGys:"N",
        neihetiebiaoGysDesc: null,
        chandibiaoPic: null,
        chandibiaoDesc: null,
        chandibiaoIsGys:"N",
        chandibiaoGysDesc: null,
        fangdaobiaoPic: null,
        fangdaobiaoDesc: null,
        fangdaobiaoIsGys:"N",
        fangdaobiaoGysDesc: null,
        softtagPic: null,
        softtagDesc: null,
        softtagIsGys:"N",
        softtagGysDesc: null,
        waixiangPic: null,
        waixiangDesc: null,
        waixiangIsGys:"N",
        waixiangGysDesc: null,
        waixiangtiePic: null,
        waixiangtieDesc: null,
        waixiangtieIsGys:"N",
        waixiangtieGysDesc: null,
        guagouPic: null,
        guagouDesc: null,
        guagouIsGys:"N",
        guagouGysDesc: null,
        guagoutiePic: null,
        guagoutieDesc: null,
        guagoutieIsGys:"N",
        guagoutieGysDesc: null,
        kaobeizhiPic: null,
        kaobeizhiDesc: null,
        kaobeizhiIsGys:"N",
        kaobeizhiGysDesc: null,
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
      this.ids = selection.map(item => item.baozhuangId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加包装辅料";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const baozhuangId = row.baozhuangId || this.ids
      getBaozhuang(baozhuangId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改包装辅料";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.baozhuangId != null) {
            updateBaozhuang(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBaozhuang(this.form).then(response => {
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
      const baozhuangIds = row.baozhuangId || this.ids;
      this.$modal.confirm('是否确认删除包装辅料编号为"' + baozhuangIds + '"的数据项？').then(function() {
        return delBaozhuang(baozhuangIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/baozhuang/export', {
        ...this.queryParams
      }, `baozhuang_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
    /deep/ .el-dialog {
        height: 78vh;
        overflow: auto;
    }
</style>
