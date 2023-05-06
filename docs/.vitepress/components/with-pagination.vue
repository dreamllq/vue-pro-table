<template>
 <div style="height: 600px;" class="reset">
    <AutoPagination :fetch-data="fetchData" ref="pagination" auto-init>
      <template #default="{data, indexMethod}">
        <AutoHeightWrapper>
        <template #default="{size}">
          <ProTable :data="data" rowKey="id" :height="size.height" showSectionAlert>
            <ProTableColumn type="selection" label="选择" prop="selection"> </ProTableColumn>
            <ProTableColumn type="reserveSelection" label="跨页选择" prop="reserveSelection"> </ProTableColumn>
            <ProTableColumn type="index" label="c" prop="c"></ProTableColumn>
            <ProTableColumn prop="id" label="id"></ProTableColumn>
            <ProTableColumn prop="b" label="bb" disabled>
              <template #default="{row}">{{ row }}</template>
            </ProTableColumn>
          </ProTable>
        </template>
      </AutoHeightWrapper>  
      </template>
    </AutoPagination>
  </div>
</template>

<script setup lang="ts">
import { AutoPagination } from 'lc-vue-auto-pagination';
import { AutoHeightWrapper } from 'lc-vue-auto-height-wrapper';
import { ProTable, ProTableColumn, CustomColumnPop } from 'lc-vue-pro-table';

const fetchData: InstanceType<typeof AutoPagination>['$props']['fetchData'] = async ({ pageNo, pageSize }) => {
  const list:any[] = [];

  for(let i=0; i<pageSize; i++){
    list.push({
      id: (pageNo-1)*pageSize + i,
      a: 10,
      b: 11
    })
  }

  return {
    list: list,
    total: 201
  }
}

</script>

<style scoped>

</style>