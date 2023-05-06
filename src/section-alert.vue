<template>
  <div class='section-alert'>
    <el-button type='primary' link @click='onView'>
      查看
    </el-button>
  </div>
  <selection-rows-dialog ref='sectionRowsRef' />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SelectionRowsDialog from './selection-rows-dialog.vue';

const sectionRowsRef = ref<InstanceType<typeof SelectionRowsDialog>>();

const onView = () => {
  sectionRowsRef.value?.show();
};
</script>

<style scoped lang="scss">
.section-alert{
  line-height: 22px;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: var(--el-fill-color-lighter);
  margin-bottom: 8px;
}
</style>