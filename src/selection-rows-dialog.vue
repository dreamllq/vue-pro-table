<template>
  <el-dialog
    v-model='visible'
    title='Tips'
    width='60%'
  >
    <span>This is a message</span>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const show = () => {
  visible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>