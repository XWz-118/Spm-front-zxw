<template>
  <div class="product-list">
    <div v-if="products && products.length" class="products">
      <div v-for="product in products" :key="product.id" class="product">
        <img :src="product.imageUrl" alt="product image" @click="handleImageClick(product)" />
        <p>{{ product.name }}</p>
        <p>￥{{ product.price }}</p>
      </div>
    </div>
    <div v-else>
      没有查询到相关商品
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: Array
  },
  methods: {
    handleImageClick(product) {
      this.$emit("show-product", product);
    }
  }
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}

.product {
  margin: 10px;
  cursor: pointer;
}

.product img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>