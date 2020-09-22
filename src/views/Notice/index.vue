<template>
  <div class="hw_admin_box shaowAll">
    <div class="toolS">
      <el-button type="primary" style="margin-bottom:20px" @click="addZx">新增资讯</el-button>
      <el-form ref="filters" :inline="true" class="fixFrom">
        <el-form-item label="">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-button type="primary" style="position:relative;top:4px" @click="search">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      :data="dataList"
      tooltip-effect="dark"
      style="width:95%;margin:10px auto 20px auto;"
      highlight-current-row
    >
      <el-table-column prop="noticeImg" label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.noticeImg" width="100" height="50" alt="" srcset="">
        </template>
      </el-table-column>
      <el-table-column prop="source" label="来源" />
      <el-table-column prop="remark" label="摘要" />
      <el-table-column prop="title" label="标题" />
      <!-- <el-table-column prop="textBody" label="正文">
        <template slot-scope="scope">
          <p v-html="scope.row.textBody" />
        </template>
      </el-table-column> -->
      <el-table-column prop="releaseTime" label="发布时间" :formatter="formatDate" />
      <el-table-column
        label="编辑"
      >
        <template slot-scope="scope">
          <span style="color:#00c48f;cursor: pointer;" @click="goPre(scope.row)">预览</span>
          <span style="color:#00c48f;cursor: pointer;" @click="goEdit(scope.row)">编辑</span>
          <span style="color:red;cursor: pointer;padding-left:10px" @click="removeZX(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block fenye">
      <el-pagination
        :current-page="hwCurrent"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="hwSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="资讯操作"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <!-- <EditorImage v-if="dialogVisible" :value="content" @editlisten="geteditS" /> -->
      <el-form v-if="dialogVisible" ref="addZxData" :label-position="labelPosition" label-width="140px" :model="addZxData" :rules="rulesZx">

        <el-form-item label="上传缩略图：" prop="noticeImg">
          <div>
            <el-upload
              list-type="picture-card"
              action
              :file-list="fileList"
              :show-file-list="true"
              :http-request="uploadFile"
              :limit="1"
              :on-change="handlePreview"
              :on-success="handleSuccess"
            >
              <i class="el-icon-plus" />
              <div slot="tip" class="el-upload__tip">
                提示：支持格式JPG，JPEG,PNG,PDF
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="摘要" prop="remark">
          <el-input v-model="addZxData.remark" placeholder="请输入摘要" />
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-input v-model="addZxData.source" placeholder="请输入来源" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="addZxData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="发布时间" prop="releaseTime">
          <el-date-picker
            v-model="addZxData.releaseTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
          />

        </el-form-item>
        <el-form-item label="正文：" prop="textBody">
          <EditorImage v-if="dialogVisible" :value="addZxData.textBody" @editlisten="geteditS" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="zx_submit('addZxData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectPageNotice, delNotice, updateNotice, addNotice, fileUpload } from '@/api/chengxu'
import EditorImage from '@/components/Tinymce/index' // 富文本编辑
export default {
  components: { EditorImage },
  data() {
    return {
      fileList: [],
      uploadData: null,
      dialogVisible: false,
      time: null,
      loading: false, // loading加载
      dataList: [], // 数据列表
      hwSize: 10, // 一页多少条
      hwCurrent: 1, // 页码
      total: 0, // 总数
      title: '', // 新增修改名称
      labelPosition: 'center', // 对齐方式
      addZxData: {
        noticeImg: '',
        releaseTime: '',
        remark: '',
        source: '',
        textBody: '',
        title: ''
      },
      rulesZx: {
        noticeImg: [
          { required: true, message: '请上传缩略图', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        releaseTime: [
          { required: true, message: '请选择发布时间', trigger: 'change' }
        ],
        textBody: [
          { required: true, message: '请输入正文', trigger: 'blur' }
        ]
      }

    }
  },
  created() {

    // this.choiceBm()
  },
  mounted() {
    this.getlist()
  },
  methods: {
    goPre(row) {
      this.$router.push({ path: '/preDetaill', query: { newsId: row.id }})
    },
    goEdit(row) {
      this.dialogVisible = true
      this.addZxData = {
        id: row.id,
        noticeImg: row.noticeImg,
        releaseTime: row.releaseTime,
        remark: row.remark,
        source: row.source,
        textBody: row.textBody,
        title: row.title
      }
      this.fileList.push({
        url: row.noticeImg
      })
    },
    // 时间戳转换
    formatDate(row) {
      const date = new Date(row.releaseTime)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    // 时间戳转换
    formatDate2(value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    addZx() {
      this.fileList = []
      this.dialogVisible = true
      this.addZxData = {
        noticeImg: '',
        releaseTime: '',
        remark: '',
        source: '',
        textBody: '',
        title: ''
      }
    },
    handleSuccess(response) {
      console.log(response)
      console.log('888888888888')
    },
    uploadFile(e) {
      fileUpload(this.uploadData).then(res => {
        if (res) {
          console.log(res)
          this.addZxData.noticeImg = res.data
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.status)
        }
      })
    },
    // 获取上传文件信息
    handlePreview(file) {
      const _this = this
      var formData = new FormData()
      formData.append('file', file.raw)
      _this.uploadData = formData
    },
    geteditS(data) {
      this.addZxData.textBody = data
    },

    // 列表
    async getlist() {
      const _this = this
      _this.loading = true
      var data = {
        param: {
          startTime: _this.time ? new Date(_this.time[0]).getTime() : '',
          endTime: _this.time ? new Date(_this.time[1]).getTime() + 86399999 : '',
          pageNum: _this.hwCurrent,
          pageSize: _this.hwSize
        }
      }
      await selectPageNotice(data).then(res => {
        console.log(res)
        if (res.statusCode === '00000') {
          setTimeout(res => {
            _this.loading = false
          }, 300)
          _this.dataList = res.data.records
          _this.total = +res.data.total
        }
      })
    },
    // 新增
    async zx_submit(formName) {
      const _this = this
      await _this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addZxData.releaseTime = this.formatDate2(new Date(this.addZxData.releaseTime).getTime())
          const data = {
            param: this.addZxData
          }
          if (this.addZxData.id) {
            updateNotice(data).then(res => {
              console.log(res)
              if (res.statusCode === '00000') {
                this.dialogVisible = false
                setTimeout(() => {
                  this.getlist()
                }, 1500)
              }
            })
          } else {
            addNotice(data).then(res => {
              console.log(res)
              if (res.statusCode === '00000') {
                this.dialogVisible = false
                setTimeout(() => {
                  this.getlist()
                }, 1500)
              }
            })
          }
        }
      })
    },

    // 删除坐席
    async removeZX(e) {
      const data = {
        data: {
          id: e.id
        }

      }
      delNotice(data).then(res => {
        console.log(res)
        if (res.statusCode === '00000') {
          this.$message({ message: '删除成功', type: 'success' })
          this.getlist()
        }
      })
    },
    // 搜索
    search() {
      this.hwCurrent = 1
      this.getlist()
    },
    // 修改表格头部颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:rgba(232,243,253,1);color:rgba(54,52,69,1);border-right:1px solid #fff'
      }
    },
    // 分页
    handleSizeChange(val) {
      this.hwSize = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.hwCurrent = val
      this.getlist()
    }
  }
}
</script>

<style scoped>
.toolS{
  display: flex;
  justify-content: space-between;
   padding-bottom: 10px;
    align-items:center;
}
.shaowAll{
  /* box-shadow: 2px 4px 8px 8px rgba(0, 0, 0, 0.05); */
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 20px;

}
.Ptitle{
      font-size: 18px;
    line-height: 18px;
    color: #222;
    font-weight: 700;

}
.hw_admin_box{
    margin:20px;
}
.fenye{
    display: block;
    text-align: right;
    margin-top:20px;
}
.el-button{
    padding: 8px 12px !important;
    position: relative;
}
.el-message-box {
    width: 1500px !important;
  }
</style>
