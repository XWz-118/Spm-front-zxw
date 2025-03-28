<template>
  <!-- 创建一个表单，当表单提交时，阻止默认的提交行为并调用 onSubmit 方法 -->
  <form @submit.prevent="onSubmit">
    <!-- 输入框，类型为文本，使用 v-model 指令将输入框的值与组件的 input 数据属性双向绑定 -->
    <!-- 输入框的占位符提示用户输入商品关键字 -->
    <input 
      type="text" 
      v-model="input" 
      placeholder="请输入商品关键字"
    />
    <!-- 提交按钮，点击后会触发表单的提交事件 -->
    <button type="submit">搜索</button>
  </form>
</template>

<script>
// 导出一个 Vue 组件
export default {
  // 组件的名称，可用于调试和模板引用
  name: 'SearchBar',
  // data 函数返回组件的初始数据对象
  data() {
    return {
      // 用于存储用户在输入框中输入的内容，初始值为空字符串
      input: ''
    }
  },
  // 组件的方法对象
  methods: {
    // 表单提交时调用的方法
    onSubmit() {
      // 触发自定义事件 on-search，并将输入框中的值作为参数传递出去
      this.$emit('on-search', this.input)
    }
  }
}
</script>

<style scoped>
/* 对表单元素应用样式 */
form {
  /* 使用 flex 布局，使表单内的元素水平排列 */
  display: flex;
  /* 表单底部添加 20px 的外边距 */
  margin-bottom: 20px;
  /* 使表单左右居中 */
  margin-left: auto;
  margin-right: auto;
  /* 表单距离页面顶端 125px */
  margin-top: 125px;
  /* 设置表单的最大宽度，避免在大屏幕上过于分散 */
  max-width: 600px; 
}

/* 对输入框元素应用样式 */
input {
  /* 输入框占据剩余的可用空间 */
  flex: 1;
  /* 输入框内添加 8px 的内边距 */
  padding: 8px;
  /* 输入框内文字的字体大小为 16px */
  font-size: 16px;
}

/* 对按钮元素应用样式 */
button {
  /* 按钮内添加 8px 的上下内边距和 16px 的左右内边距 */
  padding: 8px 16px;
  /* 按钮内文字的字体大小为 16px */
  font-size: 16px;
  /* 按钮左侧添加 10px 的外边距 */
  margin-left: 10px;
}
</style>    