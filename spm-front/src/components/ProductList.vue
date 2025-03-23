<template>
  <div class="product-list">
    <h2>{{ type === 'hot-products'? 'hot products' : 'discount zone' }}</h2>
    <div class="product-container">
      <div class="product-item" v-for="product in getProducts()" :key="product.id">
        <img :src="product.image" alt="Product Image" />
        <p>{{ product.name }}</p>
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import sampleImage from '@/assets/test2.png';
//import axios frpm 'axios';

const props = defineProps({
  type: {
    type: String,
    default: 'hot-products'
  }
});

const hotProducts = ref([
  {
    id: 1,
    name: '热门商品 1',
    price: '￥99.00',
    image: sampleImage 
  },
  {
    id: 2,
    name: '热门商品 2',
    price: '￥199.00',
    image: sampleImage
  },
  {
    id: 3,
    name: '热门商品 3',
    price: '￥299.00',
    image: sampleImage
  },
  {
    id: 4,
    name: '热门商品 4',
    price: '￥399.00',
    image: sampleImage
  },
  {
    id: 5,
    name: '热门商品 5',
    price: '￥499.00',
    image: sampleImage
  }
  // 更多热门商品数据
]);

const discountProducts = ref([
  {
    id: 101,
    name: '打折商品 1',
    price: '￥49.00',
    image: sampleImage 
  },
  {
    id: 102,
    name: '打折商品 2',
    price: '￥99.00',
    image: sampleImage
  },
  {
    id: 103,
    name: '打折商品 3',
    price: '￥149.00',
    image: sampleImage
  },
  {
    id: 104,
    name: '打折商品 4',
    price: '￥199.00',
    image: sampleImage
  },
  {
    id: 105,
    name: '打折商品 5',
    price: '￥249.00',
    image: sampleImage
  }
  // 更多打折商品数据
]);

const getProducts = () => {
  if (props.type === 'hot-products') {
    return hotProducts.value.slice(0, 4); // 截取前四个热门商品
  } else {
    return discountProducts.value.slice(0, 4); // 截取前四个打折商品
  }
};
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.product-container {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  width: 100%;
}

.product-item {
  min-width: 150px;
  text-align: center;
}

.product-item img {
  width: 100%;
  height: auto;
}
</style>