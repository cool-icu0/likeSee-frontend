<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        thumb="xxx.jpg"
        :title="`${team.name} `"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{`队伍人数：${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div>
          {{ '最大人数' + team.maxNum }}
        </div>
        <div>
          {{ '过期时间' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    type="primary" size="mini" plain @click="preJoinTeam(team)">
          加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" type="success"
                    size="mini" plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
      <!--  仅加入队伍可见-->
        <van-button v-if="team.userId !== currentUser?.id" type="default"
                    size="mini" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" type="danger"
                    size="mini" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
  </div>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {teamStatusEnum} from "../constants/team.ts";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";
//获取当前用户
const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})
const showPasswordDialog =ref(false);
const password = ref('');
const joinTeamId =ref(0);
const router = useRouter();

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[],
});


onMounted( async ()=>{
  currentUser.value = await  getCurrentUser();
})
const preJoinTeam =(team:TeamType)=>{
  joinTeamId.value = team.id;
  if (team.status === 0){
    doJoinTeam()
  }else{
    showPasswordDialog.value=true;
  }
}

//队伍列表加入队伍
const doJoinTeam = async () => {
  if (!joinTeamId.value){
    return
  }
  const res = await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password:password.value,
  });
  if (res?.code === 0) {
    showSuccessToast("加入成功")
    doJoinCancel();
  } else {
    showFailToast("加入失败" + (res.description ? `， ${res.description} ` : ''));
  }
}
const doJoinCancel=()=>{
  joinTeamId.value =0;
  password.value ='';
}
/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>