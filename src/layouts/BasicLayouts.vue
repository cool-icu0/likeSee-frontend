<template>
  <!--顶部导航栏-->
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <!--主页内容-->
  <div id="content">
    <router-view/>
  </div>
  <!--底部导航栏-->
  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import routes from "../config/router.ts";
import {ref} from "vue";
const router =useRouter();

const DEFAULT_TITLE="伙伴匹配";
const title =ref(DEFAULT_TITLE);
/**
 * 根据路由切换标题
 */
router.beforeEach((to,from)=>{
  const toPath =to.path;
  const route = routes.find((route) =>{
    return toPath === route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search')
};
</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>
