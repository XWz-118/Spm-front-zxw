<template>
  <div class="app-wrapper">
    <NavBar />
    <TitleBar />
    <div class="container">
      <!-- 从 homenew.vue 复制的搜索框结构 -->
      <div class="searchContainer">
        <div class="solagan">
          <span class="Shopping-online">Shopping Online</span>
        </div>
        <div class="searchbox">
          <input type="text" v-model="searchQuery" @input="filterKeywords" @keyup.enter="performSearch" placeholder="please input the search key">    
          <button @click="performSearch">Search</button>
        </div>
        <div class="keyword-area">
          <span class="keyword-label">Keywords:</span>
          <span v-for="(keyword, index) in allKeywords" :key="index" class="keyword-item">{{ keyword }}
            <span v-if="index < allKeywords.length - 1"> </span>
          </span>
        </div>
      </div>
      <ProductList :products="products" @show-product="openProductModal" />

      <!-- 显示当前页码 -->
      <div class="page-info">
        <span>当前页码：{{ page }}</span>
      </div>

      <!-- 显示每页显示数量 -->
      <div class="limit-info">
        <span>每页显示数量：{{ limit }}</span>
      </div>

      <Pagination 
        :currentPage="page" 
        :totalPages="totalPages" 
        @page-change="handlePageChange" 
      />

      <!-- 当 modalProduct 不为空时显示悬浮的 ProductModal 组件 -->
      <ProductModal 
        v-if="modalProduct" 
        :product="modalProduct" 
        @close="closeProductModal" 
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
import TitleBar from '../components/TitleBar.vue'
import ProductList from '../components/ProductListchen.vue'
import Pagination from '../components/Pagination.vue'
import ProductModal from '../components/ProductModal.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue';

export default {
  name: 'SearchAndDisplay',
  components: {
    NavBar,
    TitleBar,
    ProductList,
    Pagination,
    ProductModal,
    Footer
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "示例商品 1",
          description: "这是一个示例商品。这里是产品介绍，型号，尺寸等信息。",
          price: 99.9,
          imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Uml0Hq_D3cM1W7_C_2ptWwHaJ4?rs=1&pid=ImgDetMain"
        },
        {
          id: 2,
          name: "示例商品 2",
          description: "这是另一个示例商品。",
          price: 149.9,
          imageUrl: "https://imgservice.suning.cn/uimg1/b2c/image/_g6Xm7MgaE0Hbn5zC_rnCw.png"
        }
      ],
      keyword: '',
      page: 1,
      totalPages: 1,
      limit: 10,
      modalProduct: null
    }
  },
  setup() {
    const searchQuery = ref('');
    const allKeywords = ref(['手机', '电脑', '平板', '相机', '耳机','...']);
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
      if (searchQuery.value.trim()!== '') {
        console.log(`开始搜索: ${searchQuery.value}`);
        this.keyword = searchQuery.value;
        this.page = 1;
        this.fetchProducts();
      }
    };

    return {
      searchQuery,
      allKeywords,
      filteredKeywords,
      filterKeywords,
      selectKeyword,
      performSearch
    };
  },
  watch: {
    keyword() {
      this.fetchProducts()
    },
    page() {
      this.fetchProducts()
    }
  },
  methods: {
    handleSearch(newKeyword) {
      this.keyword = newKeyword
      this.page = 1 // 搜索时重置页码
    },
    handlePageChange(newPage) {
      this.page = newPage
    },
    openProductModal(product) {
      this.modalProduct = product
    },
    closeProductModal() {
      this.modalProduct = null
    },
    fetchProducts() {
      axios.get('/api/products', {
        params: {
          keyword: this.keyword,
          page: this.page,
          limit: this.limit
        },
        headers: {
          Authorization: process.env.VUE_APP_AUTH_TOKEN
        }
      })
      .then(response => {
        this.products = response.data.data.results;
        // 根据实际返回设置 totalPages
      })
      .catch(error => {
        console.error('获取商品数据失败:', error);
      });
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 1750px;
}

.container {
  max-width: 1200px;
  margin: 100px auto 20px;
  padding: 20px;
}

/* 从 homenew.vue 复制的搜索框样式 */
.searchContainer {
  height: 160px;
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}

.solagan {
  width: 504px;
  height: 66px;
  display:flex;
  justify-content: center;
  align-items: center; 
}

.Shopping-online {
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
}
</style>