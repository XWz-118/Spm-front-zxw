<template>
  
  <div class="body">
        <div class="header1">
            <div class="wrapper"> 
                 <!-- 当前所处位置 -->
                <div class="location">
                    <div class="location-style"><a href="#"></a>
                        <span @click="handlegobackHome">Home</span>
                    </div>
                </div>
            </div>
        </div> 
         
            <!--My Carts-->
            
              <div class="searchContainer">
                   <div class="solagan">
                          <span class="Shopping-online">My Carts</span>
                    </div>
               </div>       
            
         
          <div class="cart-container">
    
      
          <div v-if="products.length === 0" class="empty-cart">
              <p>The Carts is empty...</p>
              <router-link to="/homenew" class="continue-shopping">Continue Shopping</router-link>
       </div>
    
       <div v-else class="">
        <div class="cart-header">
          <div class="header-item select-all">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
            <span>Select All</span>
          </div>
            <div class="header-item product-info">Product Info</div>
            <div class="header-item price">Price</div>
            <div class="header-item quantity">Quantity</div>
            <div class="header-item subtotal">Subtotal</div>
            <div class="header-item action">Action</div>
        </div>
      
      <div class="product-list">
    

          <div v-for="(product, index) in products" :key="product.id" class="product-item">
            <div class="select-item">
              <input type="checkbox" v-model="product.selected" @change="updateSelectAll">
            </div>
          <div class="product-info">
            <img :src="product.image" :alt="product.name" class="product-image">
            <div class="product-details">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-spec">{{ product.spec }}</p>
            </div>
          </div>
          
          <div class="price">¥{{ product.price.toFixed(2) }}</div>
          
          <div class="quantity">
            <button @click="decreaseQuantity(index)" :disabled="product.quantity <= 1">-</button>
            <span>{{ product.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
          
          <div class="subtotal">¥{{ (product.price * product.quantity).toFixed(2) }}</div>
          
          <div class="action">
            <button @click="removeProduct(index)" class="remove-btn">Delete</button>
          </div>
          </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
            <span>{{ selectedCount }} Items Selected</span>
          </div>
         <div class="summary-row">
          <span>TotalAmount:</span>
          <span>¥{{ totalPrice.toFixed(2) }}</span>
         </div>
         <div class="summary-row total">
          <span>TotalPrice:</span>
          <span>¥{{ (totalPrice ).toFixed(2) }}</span>
         </div>
         <button class="checkout-btn" @click="tocheckout" :disabled="selectedCount === 0">Checkout</button>
        </div>
       </div>
      </div>
     
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref, computed } from 'vue';
import checkout from './checkout.vue';
const handlegobackHome =()=>{
    router.push('/homenew'); //跳转回home
}

// 示例产品数据
const products = ref([
  {
    id: 1,
    name: '优质纯棉T恤',
    spec: '颜色: 白色 / 尺码: L',
    price: 99.99,
    quantity: 2,
    selected:false,
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 2,
    name: '时尚牛仔裤',
    spec: '颜色: 蓝色 / 尺码: 32',
    price: 199.99,
    quantity: 1,
    selected:false,
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 3,
    name: '运动鞋',
    spec: '颜色: 黑色 / 尺码: 42',
    price: 299.99,
    quantity: 1,
    selected:false,
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 4,
    name: '运动鞋',
    spec: '颜色: 黑色 / 尺码: 42',
    price: 299.99,
    quantity: 1,
    selected:false,
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 5,
    name: '运动鞋',
    spec: '颜色: 黑色 / 尺码: 42',
    price: 299.99,
    quantity: 1,
    selected:false,
    image: 'https://via.placeholder.com/80'
  }
]
);
const selectedCount = computed(() => {
  return products.value.filter(p => p.selected).length;
});


// 全选/全不选
const selectAll = ref(false);
const toggleSelectAll = () => {
  products.value.forEach(product => {
    product.selected = selectAll.value;
  });
};

// 更新全选状态
const updateSelectAll = () => {
  selectAll.value = products.value.every(product => product.selected);
};
// 计算总价
const totalPrice = computed(() => {
  return products.value.reduce((sum, product) => {
    return sum + (product.selected ? product.price * product.quantity : 0);
  }, 0);
});

// 增加数量
const increaseQuantity = (index) => {
  products.value[index].quantity++;
};

// 减少数量
const decreaseQuantity = (index) => {
  if (products.value[index].quantity > 1) {
    products.value[index].quantity--;
  }
};

// 移除商品
const removeProduct = (index) => {
  products.value.splice(index, 1);
};

// 结算
const tocheckout = () => {
  // 获取选中的商品
  const selectedProducts = products.value.filter(p => p.selected)
  
  // 如果没有选中商品，不执行跳转（按钮已禁用，这里作为额外保护）
  if (selectedProducts.length === 0) return
  
  // 跳转到结算页面，并传递选中的商品数据
  router.push({
    path: '/checkout',
    query: {
      selectedItems: JSON.stringify(selectedProducts)
    }
  })
}
</script>

<style scoped>
.body{
    background-color:white; 
    height:1024px;
}
.wrapper{
    margin:0 auto;
    width:1440px;
}
.header1{
    height: 66px;
    opacity: 1;
    background: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png);
    background-size: cover; /* 使背景图覆盖整个元素 */
    background-repeat: no-repeat; /* 防止背景图重复 */
}
.header1 .wrapper{
    padding-top:0;
    display:flex;
    /* justify-content: space-between; 让元素两端对齐，userMessage 会在最右侧 */
    align-items: center; /* 使子元素垂直居中 */
    height: 100%; /* 确保 wrapper 高度与 header 一致 */
}

.location {
    /* margin-right: auto; 使当前位置信息在左侧显示 */
    width: 120px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.location-style{
    width: 87px;
    height: 45px;
    display:flex;
    justify-content: center;
    align-items: center;
}
.location-style span {
    color: white; 
    text-decoration: none;
    font-size:22px;
}

.searchContainer{
height: 100px;
display:flex;
justify-content: flex-start;
flex-direction: column;
align-items: center;
}

.solagan{
    width: 504px;
    height: 66px;
    display:flex;
    justify-content: center;
    align-items: center; 
}
.Shopping-online{
    width:100%;
    font-size:32px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 59.52px;
    text-align: center;
    background: linear-gradient(to right, #fcb8ca, #b3faec, #00ddff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.cart-container {
    max-width: 1000px;
  margin-right: auto; /* 仅右侧自动外边距 */
  margin-left: 20px;  /* 左侧固定间距 */
  padding: 20px;
  background: #f9f9f9;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
}

.continue-shopping {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 20px;
  background-color: #409eff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.cart-header {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  margin-right: 180px;
  margin-left: 60px;
}

.product-list{
    flex:1;
    
}
.header-item {
  flex: 1;
  text-align: center;
}

.product-list {

  margin-right: 180px;
  margin-left: 60px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.product-info {
  flex: 3;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
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

.price, .quantity, .subtotal, .action {
  flex: 2;
  text-align: center;
}

.quantity button {
  width: 30px;
  height: 30px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
}

.quantity span {
  display: inline-block;
  width: 40px;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #f56c6c;
  cursor: pointer;
}

.remove-btn:hover {
  text-decoration: underline;
}
.select-all, .select-item {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-all input[type="checkbox"],
.select-item input[type="checkbox"] {
  margin-right: 15px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.cart-summary {
  position: fixed;    /* 关键属性：固定定位 */
  right: 50px;        /* 距离右侧 20px */
  bottom: 400px;       /* 距离底部 20px */
  width: 400px;       /* 保持原有宽度 */
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 可选：添加阴影增强悬浮感 */
  z-index: 100;       /* 确保悬浮层在其他内容上方 */
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background: #ff5722;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background: #e64a19;
}

@media (max-width: 768px) {
  .cart-header {
    display: none;
  }
  
  .product-item {
    flex-wrap: wrap;
    position: relative;
    padding: 15px 0;
  }
  
  .product-info {
    flex: 100%;
    margin-bottom: 10px;
  }
  
  .price, .quantity, .subtotal, .action {
    flex: 1;
    text-align: left;
    margin-bottom: 10px;
  }
  
  .action {
    position: absolute;
    right: 0;
    top: 15px;
  }
  
  .cart-summary {
    width: 100%;
    float: none;
  }

}
.checkout-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

</style>