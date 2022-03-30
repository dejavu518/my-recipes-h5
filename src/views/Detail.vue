<template>
  <div class="wrap">
    <!-- 菜品页面渲染 -->
    <div class="foods">
      <p class="recommend">为您推荐以下食物哟！</p>
      <div v-for="(item,index) in foodLists" :key="'a'+index">
        <h3>{{item.name}}</h3>
        <h4>烹饪时间：{{item.cookingtime}}</h4>
        <h4>适宜人数：{{item.peoplenum}}</h4>
        <img :src="item.pic">
        <span class="cont">【简介】</span>
        <div class="txt">
          <p>{{item.content}}</p>
          <!-- 点击详情按钮 -->
          <span @click="getDetail(item.id)">查看烹饪详情>>></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入封装request代码块
import { request } from "@/utils/request.js";
export default {
  data() {
    return {
      appkey: "de323cfd759fa942",
      classid: this.$route.query.classid,
      inputData: this.$route.query.datas,
      foodLists: [],
    };
  },
  created() {
    // 发送搜索的axios请求
    request({
      url: "/search",
      params: { appkey: this.appkey, num: 10, keyword: this.inputData },
    }).then((res) => {
      // console.log(res);
      if (res.status === 0) {
        this.foodLists = res.result.list;
      }
    });
    // 发送按类别检索的axios请求
    request({
      url: "/byclass",
      params: { appkey: this.appkey, num: 10, start: 0, classid: this.classid },
    }).then((res) => {
      // console.log(res);
      if (res.status === 0) {
        this.foodLists = res.result.list;
      }
    });
  },
  methods: {
    // 查看详情跳转
    getDetail(id) {
      this.$router.push({ path: "/cooking", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
// 引入公共css
@import ".././assets/css/common.css";
</style>