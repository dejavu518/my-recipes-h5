<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <input type="text" v-model="inputData" @keyup.enter="getNames" placeholder="  客官，想吃啥呢？">
    </div>
    <h3>分类</h3>
    <!-- 分类标签渲染 -->
    <div class="wrap">
      <ul class="cate_t">
        <li v-for="(item,index) in categories" :key="'c'+index" @click="getCate(item.classid)" class="fl">
          {{item.name}}
        </li>
        <div class="clear"></div>
      </ul>
      <div class="cate_b">
        <div class="tag_item fl" v-for="(item,index) in lists" :key="'d'+index" @click="byClass(item.classid)">
          {{item.name}}
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入封装的request代码块
import { request } from "@/utils/request.js";
export default {
  data() {
    return {
      appkey: "de323cfd759fa942",
      categories: [],
      lists: [],
      inputData: "",
    };
  },
  created() {
    // 按类别发送axios请求
    request({
      url: "/class",
      params: { appkey: this.appkey },
    }).then((res) => {
      if (res.status === 0) {
        console.log(res);
        this.categories = res.result;
      } else {
        alert(res.msg);
      }
    });
  },
  methods: {
    // 筛选
    getCate(classid) {
      let select = this.categories.filter((item) => item.classid == classid);
      this.lists = select[0].list.slice(0, 12);
    },
    // 搜索跳转
    getNames() {
      this.$router.push({ path: "/detail", query: { datas: this.inputData } });
    },
    // 按类别跳转
    byClass(classid) {
      this.$router.push({ path: "/detail", query: { classid } });
    },
  },
};
</script>

<style scoped>
/* 引入公共css */
@import ".././assets/css/common.css";
h3 {
  text-align: center;
  margin-bottom: 20px;
}
.cate_t li {
  width: 30%;
  height: 32px;
  border-bottom: 0.1px solid #f1f3f4;
  text-align: center;
  line-height: 35px;
  background: cornsilk;
  margin: 5px 5px;
}
.tag_item {
  width: 30%;
  height: 50px;
  background: aquamarine;
  margin: 5px 5px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
}
.cate_t {
  margin-bottom: 30px;
}
</style>