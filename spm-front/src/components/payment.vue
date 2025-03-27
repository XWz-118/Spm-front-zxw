<template>
<div class="paymentlist">
    <div v-for="(product, index) in products" :key="product.id" class="product-item">
        <div class="product-info">
            <img :src="product.image" :alt="product.name" class="product-image">
            <div class="product-details">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-spec">{{ product.spec }}</p>
            </div>
          </div>
          
          <div class="price-quantity-group">
          <div class="price">price:¥{{ product.price.toFixed(2) }}</div>
          <div class="quantity">quantity:{{ product.quantity }}</div>
          <div class="subtotal">subtotal:¥{{ (product.price * product.quantity).toFixed(2) }}</div>
         </div>

          <div class="action">
            <button @click="removeProduct(index)" class="remove-btn">删除</button>
          </div>
          </div>
</div>

</template>

<script setup>
import {ref} from 'vue';
const products = ref([
  {
    id: 1,
    name: '优质纯棉T恤',
    spec: '颜色: 白色 / 尺码: L',
    price: 99.99,
    quantity: 2,
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 2,
    name: '时尚牛仔裤',
    spec: '颜色: 蓝色 / 尺码: 32',
    price: 199.99,
    quantity: 1,
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 3,
    name: '运动鞋',
    spec: '颜色: 黑色 / 尺码: 42',
    price: 299.99,
    quantity: 1,
    image: 'https://via.placeholder.com/80'
  },
]);

const removeProduct = (index) => {
  products.value.splice(index, 1);
};
</script>

<style scoped>
.paymentlist{
    width: 800px;
  
}

.product-item{
    display: flex;
    flex-direction: row;
padding: 20px;
width: 780px;
height: 262px;
opacity: 1;
background: rgba(255, 255, 255, 0.3);
}

.product-info {
  flex: 3;
  display: flex;
  align-items: center;
  padding-left: 0px;
}

.product-image {
  width: 100px;
  height: 100px;
  padding-left: 10px;
  background-color: white;
  object-fit: cover;
  margin-right: 15px;
}

.product-name {
  margin: 0;
  font-size: 16px;
}

.product-spec {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}
.price-quantity-group {
  margin-left: 20px;
    flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-around; /* 均匀分布 */
  min-width: 250px; /* 确保有足够空间 */
}
.price, .quantity, .subtotal, .action {
    flex: 1; /* 平均分配剩余空间 */
    display: flex;
  padding: 0 10px;
  white-space: nowrap;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.remove-btn {
    margin-left: 50px;
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #ff7875;
}
</style>

