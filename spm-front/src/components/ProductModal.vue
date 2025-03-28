<template>
  <!-- 模态框覆盖层，点击覆盖层关闭模态框 -->
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <!-- 左侧图片区，展示产品图片 -->
      <div class="modal-image">
        <img :src="product.imageUrl" alt="Product Image" />
      </div>
      <!-- 右侧详情区，展示产品名称、价格、介绍和操作按钮 -->
      <div class="modal-details">
        <div class="name-price-container">
          <div class="detail-row header-row">
            <!-- 显示产品名称 -->
            <span class="detail-name">Name: {{ product.name }}</span>
            <!-- 显示产品价格 -->
            <span class="detail-price">￥: {{ product.price }}</span>
          </div>
        </div>
        <div class="description-container">
          <div class="detail-row description-row">
            <!-- 显示产品介绍标题 -->
            <span>产品介绍:</span>
            <!-- 显示产品介绍内容 -->
            <p>{{ product.description }}</p>
          </div>
        </div>
        <div class="button-box">
          <!-- 点击调用 buyNow 方法，实现购买操作 -->
          <div class="button-left" @click="buyNow">Add to Stars</div>
          <!-- 点击调用 addToCart 方法，实现添加到购物车操作 -->
          <div class="button-right" @click="addToCart">Add to Cart</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 axios 用于发送 HTTP 请求
import axios from 'axios';

export default {
  name: "ProductModal",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 关闭模态框，触发自定义事件通知父组件
    close() {
      this.$emit("close");
    },
    async buyNow() {
      try {
        // 向 /product/favorite 接口发送 POST 请求，传递产品 ID
        const response = await axios.post('/product/favorite', {
          productId: this.product.id,
        });
        // 打印购买成功信息和响应数据
        console.log('添加收藏夹成功:', response.data);
        // 这里可以添加更多逻辑，如弹出提示框告知用户购买成功
        alert('添加收藏夹成功！');
      } catch (error) {
        // 打印购买失败信息和错误详情
        console.error('添加收藏夹失败:', error);
        // 这里可以添加更多逻辑，如弹出提示框告知用户购买失败
        alert('添加收藏夹失败，请稍后重试！');
      }
    },
    async addToCart() {
      try {
        // 修改为新的添加到购物车接口地址 /cart
        const response = await axios.post('/cart', {
          productId: this.product.id,
        });
        // 打印添加到购物车成功信息和响应数据
        console.log('添加到购物车成功:', response.data);
        // 这里可以添加更多逻辑，如弹出提示框告知用户添加成功
        alert('已成功添加到购物车！');
      } catch (error) {
        // 打印添加到购物车失败信息和错误详情
        console.error('添加到购物车失败:', error);
        // 这里可以添加更多逻辑，如弹出提示框告知用户添加失败
        alert('添加到购物车失败，请稍后重试！');
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(229, 229, 229, 0.3);
  z-index: 1000;
}

/* 具体界面位置及尺寸按照要求调整 */
.modal-content {
  position: absolute;
  left: 147px;
  top: 141px;
  width: 1160px;
  height: 753px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  border-radius: 8px;
  opacity: 1;
  overflow: hidden;
}

/* 左侧图片区 */
.modal-image {
  position: absolute;
  left: 87px;
  top: 94px;
  right: 753px;
  bottom: 306px;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 右侧详情区 */
.modal-details {
  width: 60%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name-price-container {
  position: absolute;
  left: 438px;
  top: 108px;
  right: 124px;
  bottom: 510px;
  border: none; 
  padding: 10px; 
}

.description-container {
  position: absolute;
  left: 485px;
  top: 190px;
  right: 11px;
  bottom: 403px;
  border: none; 
  padding: 10px; 
}

.detail-row {
  margin-bottom: 20px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.description-row {
  flex-grow: 1;
  font-size: 18px;
  color: #666;
  line-height: 1.5;
}

.description-row span,
.description-row p {
  color: gray;
}

.button-box {
  position: absolute;
  left: 128px;
  right: 169px;
  top: 583px;
  bottom: 87px;
  width: 863px;
  height: 83px;
  border: none; 
  display: flex;
}

.button-left,
.button-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 20px; 
  background-image: url('https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png'); 
  background-size: cover; 
  color: white; 
  font-weight: bold; 
  margin: 5px; 
  font-size: 24px; 
}

.button-row {
  text-align: right;
}

.button-row button {
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 0.3s;
}

.btn-buy {
  background-color: #ff6b6b;
  color: #fff;
}

.btn-buy:hover {
  background-color: #ff5252;
}

.btn-cart {
  background-color: #4caf50;
  color: #fff;
}

.btn-cart:hover {
  background-color: #43a047;
}
</style>    