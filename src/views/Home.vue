<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <input type="text" v-model="inputData" @keyup.enter="getNames" placeholder="  客官，想吃啥呢？">
    </div>
    <!-- 推荐菜品板块 -->
    <div class="wrap">
      <h3 class="fl">为你推荐</h3>
      <router-link to="/category" tag="span" class="fr btn">菜品分类</router-link>
      <div class="clear"></div>
      <div class="special">
        <h3>{{foodLists.name}}</h3>
        <img :src="foodLists.pic">
        <span class="cont">【简介】</span>
        <div class="txt">
          <p>{{foodLists.content}}</p>
          <span @click="getDetail(foodLists.id)">查看烹饪详情>>></span>
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
      inputData: "",
      foodLists: "",
      id: 2,
    };
  },
  created() {
    // 发送id为2的axios需求
    request({
      url: "/detail",
      params: { appkey: this.appkey, id: 2 },
    }).then((res) => {
      // console.log(res);
      if (res.status === 0) {
        this.foodLists = res.result;
      } else {
        alert(res.msg);
      }
    });
  },
  methods: {
    // 搜索菜品跳转
    getNames() {
      this.$router.push({ path: "/detail", query: { datas: this.inputData } });
    },
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
.special {
  height: 500px;
  border: solid 0.5px lightsalmon;
  margin-top: 10px;
  padding: 15px 10px;
}
.btn {
  color: slateblue;
  font-style: italic;
}
</style>