<template>
  <div class="app-wrapper">
    <NavBar />
    <TitleBar />
    <div class="container">
      <SearchBar @on-search="handleSearch" />
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
import SearchBar from '../components/SearchBar.vue'
import ProductList from '../components/ProductListchen.vue'
import Pagination from '../components/Pagination.vue'
import ProductModal from '../components/ProductModal.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'SearchAndDisplay',
  components: {
    NavBar,
    TitleBar,
    SearchBar,
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
</style>