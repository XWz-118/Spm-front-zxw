<template>
  <div class="body">
    <div class="header">
      <div class="wrapper"> 
         <!-- 当前所处位置 -->
        <div class="location">
          <div class="location-style">
            <a href="#"></a>
            <span>Home</span>
          </div>
        </div>

        <!-- 导航栏 -->
        <div class="nav">
          <ul>
            <li>
              <CategoryDropdown />
              <!-- 种类 -->
            </li>
            <li>
              <Carts />
              <!-- 购物车 -->
            </li>
            <li>
              <Myorders />
              <!-- 我的订单 -->
            </li>
          </ul>
        </div>
        <!-- 用户信息 -->
        <div class="userMessage">
          <div class="userInfo">
            <div class="Touxiang">
              <img src="../assets/test1.png" alt="用户头像">
            </div>
            <span class="userName" @click="handlegoUser">Swen</span>
          </div>
          <button class="logoutBtn" @click="handleLogout">goback</button>
        </div>
      </div>
    </div> 
    <!-- <NavigationBar/> -->

    <div class="middle1">
      <div class="searchContainer">
        <!-- shopping online标语 -->
        <div class="solagan">
          <span class="Shopping-online">Shopping Online</span>
        </div>
        <div class="searchbox">
          <!-- search输入框 -->
          <input
            type="text"
            v-model="searchQuery"
            @input="filterKeywords"
            @keyup.enter="performSearch"
            placeholder="please input the search key"
          />
          <button @click="performSearch">Search</button>
        </div>
        <!-- keywords推荐词 -->
        <div class="keyword-area">
          <span class="keyword-label">Keywords:</span>
          <span
            v-for="(keyword, index) in allKeywords"
            :key="index"
            class="keyword-item"
          >
            {{ keyword }}
            <span v-if="index < allKeywords.length - 1"> </span>
          </span>
        </div>
      </div>
    </div>
    
    <!-- 轮播图区域 -->
    <div class="banner"> 
      <Carousel :images="swiperImages" />
    </div>

    <!-- 商品展示区域 -->
    <div class="pdbody">
      <div class="pd">
        <ProductList type="hot-products" />
        <ProductList type="discount-zone" />
        <!-- <ProductList /> -->
      </div>
    </div> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CategoryDropdown from '@/components/CategoryDropdown.vue';
import Carts from './Carts.vue';
import Myorders from './Myorders.vue';
import Carousel from '@/components/Carousel.vue';
import ProductList from '../components/ProductList.vue';

const router = useRouter();

const handleLogout = () => {
  router.push('/login');
};
const handlegoUser = () => {  // 跳转至用户个人中心
  router.push('/userMessage');
};

const searchQuery = ref('');
const allKeywords = ref(['手机', '电脑', '平板', '相机', '耳机', '...']);
const filteredKeywords = ref([]);

const filterKeywords = () => {
  if (searchQuery.value === '') {
    filteredKeywords.value = [];
  } else {
    filteredKeywords.value = allKeywords.value.filter(keyword =>
      keyword.includes(searchQuery.value)
    );
  }
};

const selectKeyword = (keyword) => {
  searchQuery.value = keyword;
  filteredKeywords.value = [];
  console.log(`搜索关键词: ${keyword}`);
};

const performSearch = () => {
  if (searchQuery.value.trim() !== '') {
    console.log(`开始搜索: ${searchQuery.value}`);
    // 当输入关键词后点击Search或按回车时，跳转到SearchAndDisplay界面，并传递关键词
    router.push({ path: '/search', query: { keyword: searchQuery.value } });
  }
};

// 示例轮播图图片数据
const swiperImages = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]);
</script>

<style scoped>
.body {
  background-color: #fdeff3;
}
.wrapper {
  margin: 0 auto;
  width: 1440px;
}
.header {
  height: 66px;
  opacity: 1;
  background: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png);
  background-size: cover;
  background-repeat: no-repeat;
}
.header .wrapper {
  padding-top: 0;
  display: flex;
  align-items: center;
  height: 100%;
}

.location {
  width: 120px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.location-style {
  width: 87px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.location-style span {
  color: white;
  text-decoration: none;
  font-size: 22px;
}

.nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.nav li {
  margin-left: 20px;
  list-style-type: none;
}

.nav li a {
  color: white;
  text-decoration: none;
  font-size: 22px;
  display: flex;
  align-items: center;
  height: 66px;
}

.userMessage {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.userInfo {
  display: flex;
  align-items: center;
}
.Touxiang img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.username {
  color: white;
  font-size: 22px;
}
.logoutBtn {
  background: none;
  border: none;
  color: rgb(0, 162, 249);
  font-size: 22px;
  cursor: pointer;
  margin-left: 10px;
}
.logoutBtn:hover {
  text-decoration: underline;
}

.middle1 {
  margin: 0 auto;
  width: 1440px;
  display: flex;
  justify-content: center;
}
.middle1 .searchContainer {
  height: 160px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}

.solagan {
  width: 504px;
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Shopping-online {
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 59.52px;
  text-align: center;
  background: linear-gradient(to right, #fcb8ca, #b3faec, #00ddff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.searchbox {
  position: relative;
  width: 504px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.searchbox input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  opacity: 0.8;
}

.searchbox button {
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #7dbcff;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}

.keyword-area {
  color: #6699cc;
  font-size: 16px;
  margin-top: 10px;
}

.keyword-label {
  color: #ff6699;
}

.keyword-item {
  margin-right: 5px;
  cursor: pointer;
}

.banner {
  height: 420px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pdbody {
  margin: 0 auto;
  width: 1400px;
  justify-content: space-between;
}
.pd {
  width: 100%;
}
</style>