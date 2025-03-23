<template>
    <el-dropdown trigger="click" @command="handleCategoryClick">
      <span class="dropdown-trigger">
        Categories <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="/category1">种类 1</el-dropdown-item>
          <el-dropdown-item command="/category2">种类 2</el-dropdown-item>
          <el-dropdown-item command="/category3">种类 3</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import {ref,onMounted} from 'vue';
  import { ElIcon } from 'element-plus';
  import { ArrowDown } from '@element-plus/icons-vue';
  const router = useRouter();
  const dropdownRef = ref(null);

  /*onMounted(() => {
    console.log('Dropdown element:', dropdownRef.value); 
    if (dropdownRef.value) {
        const rect = dropdownRef.value.$el.getBoundingClientRect(); 
        console.log('Dropdown rect:', rect);
    }
  });*/
  const handleCategoryClick = (command) => {
    router.push(command);
  };
  </script>
  
  <style scoped>
  /* 单独为下拉选项组件设置样式 */
.dropdown-trigger {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size:22px;
}

.el-dropdown-menu {
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
}

.el-dropdown-item {
  color: white;
}

.el-dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
  </style>