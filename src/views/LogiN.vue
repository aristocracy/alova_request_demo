<script setup lang="ts">
import { ref, type Ref,onMounted } from "vue";
import {instance,service} from "../../env.d";
import { useRequest } from "alova";
import type {responseData, softwareListData} from "@/stores/type";
//import { useForm } from "@alova/scene-vue";

const { proxy } = instance();
const formData:Ref<softwareListData> = ref({page:1,size:10,category_id:1});
const doLogin = () =>{
  const _mtd = service.getSoftwareList("/files",{
    params:formData.value,
    localCache: {
      mode:"placeholder",
      expire: 1000 * 30
    }
  });
  return _mtd;
};
const {
  loading:submiting,
  data,
  error,
  send,
  onSuccess,
  onError,
  onComplete,
}=useRequest(() => {
  //可以修改准备提交的数据
  return doLogin();
},{
  initialForm: {
    // username: 'usagi',
    // password: '12345678a'
    page:1,
    size:10,
    category_id:1,
  },
  immediate:false,
});
onSuccess((event)=>{
  console.log("onSuccess Event=>",event.data);
});
onComplete((event)=>{
  console.log("onComplete Event=>",event);
});
onError((event)=>{
  console.error("onError Event=>",event,error);
});
const login = async () => {
  await send();
  let resp:Ref<responseData>=data as Ref<responseData>;
  proxy.$message.success(resp.value.message);
};
onMounted(()=>{
  alert(import.meta.env.USAGI_DEV+"；"+import.meta.env.USAGI_API_BASE_URL);
});
</script>
<template>
  <div class="login">
    <a-input type="number" v-model:value="formData.page" />
    <a-input type="number" v-model:value="formData.size" />
    <a-input type="number" v-model:value="formData.category_id" />
    <a-button type="primary" @click="login" :loading="submiting">发送请求</a-button>
  </div>
</template>

<style scoped lang="less">
@import url("./styles/login.less");
</style>
@/stores/schema