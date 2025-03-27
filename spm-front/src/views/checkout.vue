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
              <div class="searchContainer">
               <!-- 顶部返回按钮 -->
           <div class="paymentheader">
                  <button class="back-btn" @click="router.back()">
                           &lt; return
                   </button>
             </div>
                   <div class="solagan">
                          <span class="Shopping-online">Order Payment</span>
                    </div>
               </div>       
 <div class="checkout-container">
   
    

    <!-- 商品清单 -->
    <div class="product-sistection">
      <h3>Product List ({{ selectedItems.length }}件)</h3>
      <div class="product-list">
        <div 
          v-for="item in selectedItems" 
          :key="item.id" 
          class="product-item"
        >
          <img :src="item.image || 'https://via.placeholder.com/80'" class="product-image">
          <div class="product-info">
            <h4>{{ item.name }}</h4>
            <p class="spec">{{ item.spec }}</p>
            <div class="price-quantity">
              <span>¥{{ item.price.toFixed(2) }}</span>
              <span class="multiply">×</span>
              <span>{{ item.quantity }}</span>
              <span class="equals">=</span>
              <span class="subtotal">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 收货信息 -->
    <div class="address-section">
      <h3>Shipping Information</h3>
      <div class="address-input">
        <div class="input-group">
          <label>Recipient：</label>
          <input v-model="address.name" placeholder="Please Input Your Name">
        </div>
        <div class="input-group">
          <label>Mobile Number：</label>
          <input v-model="address.phone" placeholder="Please Input Your Mobile Number" type="tel">
        </div>
        <div class="input-group">
          <label>Region：</label>
          <input v-model="address.region" placeholder="Province/City/District">
        </div>
        <div class="input-group">
          <label>Detailed Address：</label>
          <textarea v-model="address.detail" placeholder="Street Address"></textarea>
        </div>
      </div>
    </div>
    
     <!-- 支付方式 -->
     <div class="payment-section">
      <h3>Payment Method</h3>
      <div class="payment-options">
        <label 
          v-for="method in paymentMethods" 
          :key="method.value"
          :class="{ active: selectedMethod === method.value }"
        >
          <input 
            type="radio" 
            v-model="selectedMethod" 
            :value="method.value"
            hidden
          >
          <span class="icon">{{ method.icon }}</span>
          <span class="name">{{ method.name }}</span>
        </label>
      </div>
    </div>
    <!-- 订单汇总 -->
    <div class="summary">
      <div class="summary-row">
        <span>Subtotal：</span>
        <span>¥{{ totalPrice.toFixed(2) }}</span>
      </div>
      <div class="summary-row total">
        <span>Totalprice：</span>
        <span>¥{{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <!-- 支付按钮 -->
    <button 
      class="pay-btn" 
      @click="handlePayment"
      :disabled="!isFormValid || isProcessing"
    >
      {{ isProcessing ? 'Paying...' : `Confirm Payment ¥${totalPrice.toFixed(2)}` }}
    </button>
 </div>
 </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 从路由参数获取选中的商品
const selectedItems = ref([])
const handlegobackHome =()=>{
    router.push('/homenew'); //跳转回home
}
onMounted(() => {
  if (route.query.selectedItems) {
    try {
      selectedItems.value = JSON.parse(route.query.selectedItems)
    } catch (e) {
      console.error('解析商品数据失败:', e)
      router.push('/cart') // 解析失败返回购物车
    }
  } else {
    // 如果没有商品数据，返回购物车
    router.push('/cart')
  }
})

// 地址信息
const address = ref({
  name: '',
  phone: '',
  region: '',
  detail: ''
})
const paymentMethods = [
  { value: 'wechat', name: 'Wechat', icon: '💳' },
  { value: 'alipay', name: 'Alipay', icon: '💰' },
  { value: 'bank', name: 'Bank', icon: '🏦' }
]
const selectedMethod = ref('wechat')
// 价格计算
const totalPrice = computed(() => {
  return selectedItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

// 支付状态
const isProcessing = ref(false)

// 表单验证
const isFormValid = computed(() => {
  return (
    address.value.name.trim() && 
    /^1[3-9]\d{9}$/.test(address.value.phone) &&
    address.value.region.trim() &&
    address.value.detail.trim()
  )
})

// 支付处理
const handlePayment = async () => {
  try {
    isProcessing.value = true
    
    // 构造订单数据
    const orderData = {
      items: selectedItems.value,
      address: address.value,
      totalAmount: totalPrice.value,
      createdAt: new Date().toISOString()
    }
    
    // 这里应该是调用实际API
    console.log('提交订单数据:', orderData)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 支付成功后跳转
    router.push({
      path: '/paymentsuccess',
      query: {
        orderId: `ORDER_${Date.now()}`,
        amount: orderData.totalAmount.toFixed(2)
      }
    })
  } catch (error) {
    alert('支付失败: ' + error.message)
  } finally {
    isProcessing.value = false
  }
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
  display: flex;
  justify-content: center; /* 改为居中 */
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


.checkout-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'PingFang SC', sans-serif;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.paymentheader{
  height: 20px;
  width: 20;
  color: #333;
  margin-left: 0;
  font-size: 20px;
  align-items: left;
}

.back-btn {
  position: absolute;
  left: 20px; /* 调整左边距 */
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666; /* 按钮颜色 */
}

h2 {
  color: #333;
  margin: 0;
  font-size: 20px;
}

h3 {
  color: #333;
  margin: 20px 0 15px;
  font-size: 18px;
  font-weight: 600;
}

/* 商品列表样式 */
.product-list {
  background: white;
  border-radius: 12px;
  padding: 0 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.product-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #f5f5f5;
}

.product-item:last-child {
  border-bottom: none;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 8px;
  background: #f5f5f5;
}

.product-info {
  flex: 1;
}

.product-info h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
}

.spec {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #999;
}

.price-quantity {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
}

.multiply, .equals {
  color: #999;
}

.subtotal {
  color: #f56c6c;
  font-weight: bold;
  margin-left: 10px;
}

/* 地址输入样式 */
.address-input {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.input-group {
  margin-bottom: 15px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
}

.input-group textarea {
  height: 80px;
  resize: vertical;
}

/* 支付选项样式 */
.payment-options {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.payment-options label {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.2s;
}

.payment-options label:last-child {
  border-bottom: none;
}

.payment-options label.active {
  background: #f0f9ff;
}

.payment-options .icon {
  font-size: 20px;
  margin-right: 10px;
  width: 24px;
  text-align: center;
}

.payment-options .name {
  font-size: 16px;
}

/* 订单汇总样式 */
.summary {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  color: #666;
}

.summary-row.discount {
  color: #67c23a;
}

.summary-row.total {
  font-weight: bold;
  font-size: 17px;
  color: #333;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

/* 支付按钮样式 */
.pay-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #ff6b6b, #f56c6c);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
  transition: all 0.3s;
}

.pay-btn:disabled {
  background: #ccc;
  box-shadow: none;
  cursor: not-allowed;
}

.pay-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 108, 108, 0.4);
}

/* 移动端适配 */
@media (max-width: 480px) {
  .checkout-container {
    padding: 15px;
  }
  
  .product-image {
    width: 70px;
    height: 70px;
  }
}
</style>