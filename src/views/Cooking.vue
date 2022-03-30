<template>
  <div class="wrap">
    <!-- 烹饪详情页面 -->
    <div>
      <h2>烹饪详情</h2>
      <!-- 返回首页按钮 -->
      <router-link to="/" class="fr" tag="button">返回首页</router-link>
      <h4>准备时间：{{foodLists.preparetime}}</h4>
      <h4>烹饪时间：{{foodLists.cookingtime}}</h4>
      <h4 class="need">所需食材：</h4>
      <span v-for="(item,index) in foodLists.material" :key="'b'+index" class="fl">{{item.mname}}({{item.amount}})/</span>
      <div class="clear"></div>
      <h4>烹饪步骤：</h4>
      <div v-for="(item,index) in foodLists.process" :key="index">
        <img :src="item.pic" alt="">
        <p>{{item.pcontent}}</p>
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
      id: this.$route.query.id,
      foodLists: [],
    };
  },
  mounted() {
    // 发送通过id检索详情的axios请求
    request({
      url: "/detail",
      params: { appkey: this.appkey, id: this.id },
    }).then((res) => {
      console.log(res);
      if (res.status === 0) {
        this.foodLists = res.result;
        // console.log(this.foodLists);
      } else {
        alert(res.msg);
      }
    });
  },
};
</script>

<style scoped>
/* 引入公共css */
@import ".././assets/css/common.css";
.wrap {
  padding: 20px 10px;
}
h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #212222;
}
.wrap span {
  font-size: 14px;
  color: saddlebrown;
}
img {
  margin-bottom: 10px;
  margin-top: 10px;
}
h2 {
  text-align: center;
  color: sienna;
  margin-bottom: 20px;
}
</style>