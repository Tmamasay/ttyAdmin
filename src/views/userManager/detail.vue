<template>
  <div class="xfjl_box shaowAll">
    <div>
      <div class="toolS">
        <p class="Ptitle">基本信息</p>
      </div>
      <div class="isTrue">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="用户名：" style="width:350px">
            <el-input v-model="companyAuth.user.name" :readonly="true" />
          </el-form-item>
          <el-form-item label="公司名称：" style="width:350px">
            <el-input v-model="companyAuth.user.companyName" :readonly="true" />
          </el-form-item>
          <el-form-item label="职位：" style="width:350px">
            <el-input v-model="companyAuth.user.position" :readonly="true" />
          </el-form-item>
          <el-form-item label="会员注册日期：" style="width:350px">
            <el-input v-model="companyAuth.user.createTime" :readonly="true" />
          </el-form-item>
          <el-form-item label="手机号：" style="width:350px">
            <el-input v-model="companyAuth.user.username" :readonly="true" />
          </el-form-item>
          <el-form-item label="服务器预计容量：" style="width:350px">
            <el-input v-model="companyAuth.user.name" :readonly="true" />
          </el-form-item>
          <el-form-item label="已使用容量：" style="width:350px">
            <el-input v-model="companyAuth.user.name" :readonly="true" />
          </el-form-item>
          <el-form-item label="使用容量百分比：" style="width:350px">
            <el-input v-model="companyAuth.user.name" :readonly="true" />
          </el-form-item>
          <el-form-item label="状态：" style="width:350px">
            <el-input v-model="companyAuth.user.status" :readonly="true" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div v-if="+companySgin!==0">
      <div class="toolS">
        <p class="Ptitle">实名认证信息</p>
      </div>
      <div v-if="companyAuth" class="isTrue">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="公司名称：" style="width:500px">
            <el-input v-model="companyAuth.customer.companyName" :readonly="true" />
          </el-form-item>
          <el-form-item label="统一社会信用代码/注册号/组织机构代码：" style="width:500px">
            <el-input v-model="companyAuth.customer.companyCode" :readonly="true" />
          </el-form-item>
          <el-form-item label="公司注册地址：" style="width:500px">
            <el-input v-model="companyAuth.customer.address" :readonly="true" />
          </el-form-item>
          <el-form-item label="注册日期：" style="width:500px">
            <el-input v-model="companyAuth.customer.companyTime" :readonly="true" />
          </el-form-item>
          <el-form-item label="经营期限至：" style="width:500px">
            <el-input v-model="companyAuth.customer.limitTime" :readonly="true" />
          </el-form-item>
          <el-form-item label="营业执照：" style="width:500px">
            <el-image
              style="width: 100px; height: 100px"
              :src="companyAuth.customer.companyImg"
            />
            <!-- <img :src="companyAuth.customer.companyImg" alt="" srcset="" width="100" height="100"> -->
            <!-- <el-input v-model="companyAuth.customer.companyImg" :readonly="true" /> -->
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div v-if="+companySgin===2">
      <div class="toolS">
        <p class="Ptitle">订单列表</p>
      </div>
      <div />
    </div>

    <div v-if="+companySgin===1">
      <div class="toolS">
        <p class="Ptitle">审核意见</p>
      </div>
      <div>
        <textarea v-model="reason" rows="10" cols="180" style="padding:6px 8px" placeholder="请输入审核意见" />
      </div>
    </div>

    <div v-if="+companySgin===1" slot="footer" class="dialog-footer" style="margin-left:45%;margin-top:40px">
      <el-button size="medium" type="danger" @click="checkAuth(3)">未通过</el-button>
      <el-button size="medium" type="primary" @click="checkAuth(2)">通 过</el-button>
    </div>

  </div>
</template>

<script>
import { getCompanyByCustomerId, updateCompanyStatus } from '@/api/chengxu'
export default {
  data() {
    return {
      reason: null,
      companyAuth: null,
      companySgin: null,
      query: {
        callerNum: ''
      },
      datalist: [],
      yueNum: 0,
      Size: 10, // 一页多少条
      Current: 1, // 页码
      total: 0, // 总数
      time: null,
      type: null,
      loading: false // loading加载
    }
  },
  mounted() {
    this.companySgin = this.$route.query.companyStatus
    this.getlist()
  },
  methods: {
    async checkAuth(e) {
      await updateCompanyStatus({
        param: {
          id: this.companyAuth.user.id,
          reason: this.reason,
          status: e
        }
      }).then(res => {
        console.log(res)
        if (res.statusCode === '00000') {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 3 * 1000
          })
          this.$router.go(-1)// 返回上一层
        }
      })
    },
    getlist() {
      const _this = this
      _this.loading = true
      var data = {
        param: {
          customerId: this.$route.query.customerId
        }
      }
      getCompanyByCustomerId(data).then(res => {
        console.log(res)
        if (res.statusCode === '00000') {
          setTimeout(res => {
            _this.loading = false
          }, 300)
          _this.companyAuth = res.data
        }
      })
    },
    // 搜索
    sousuo() {
      this.getlist()
    },
    // 时间戳转换
    formatDate(value) {
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
    toNum(value) {
      if (!value) return 0
      return value.toFixed(2)
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
.el-input>>>.el-input__inner {
    border: 0 !important;
}
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
.xfjl_box{
  margin:20px;
}
.el-button{
    padding: 8px 12px !important;
}
.fenye{
    display: block;
    text-align: right;
    margin-top:20px;
}
.yue{
  width:100%;
  height:50px;
  font-size: 18px;
    color: #606266;
    line-height: 50px;
    padding-left: 10px;
    font-weight: 600;
  background: #fff;
  float:left;
  margin-bottom: 20px;
  /* margin-left:122px; */
  box-shadow: 0px 0px 5px #d2d2d2;
  border-radius: 5px;
  /* margin-top:20px; */
}
</style>
