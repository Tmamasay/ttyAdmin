<template>
  <div class="ttNewsDetailCont">
    <div v-if="detail" class="showDetail">
      <p class="D1">{{ detail.title }}</p>
      <p class="D2">来源：{{ detail.source }}     <span style="padding-left:57px">发布时间：{{ formatDate(detail.releaseTime) }}</span> </p>
      <p class="D3" v-html="detail.textBody" /></div>

    <Footer />
  </div>
</template>

<script>
import { getNoticeOne } from '@/api/chengxu'
export default {
  name: 'Home',
  data() {
    return {

      detail: null

    }
  },
  async created() {
    this.getTestList()
  },
  methods: {
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
    // onAdd() {
    //   this.$router.push({ name: 'CreateTest' })
    // },
    // onEdit(item, index) {
    //   this.$router.push({ name: 'EditTest', params: { id: item.id }})
    // },
    getTestList() {
      try {
        getNoticeOne({
          data: {
            id: this.$route.query.newsId
          }
        }).then(res => {
          if (res) {
            this.detail = res.data
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.ttNewsDetailCont{
  width: 100%;
  .showDetail{
width: 1000px;
margin: 100px auto;
text-align: center;
.D1{
  font-size:35px;
font-family:PingFang SC;
font-weight:500;
color:rgba(45,45,45,1);
line-height:53px;
}
.D2{
  font-size:14px;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
line-height:80px;
}
.D3{
  font-size:16px;
font-family:PingFang SC;
font-weight:500;
color:rgba(45,45,45,1);
line-height:30px;
text-align: left;
}

  }

}

</style>

