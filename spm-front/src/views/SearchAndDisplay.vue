<template>
  <div class="app-wrapper">
    <NavBar />
    <TitleBar />
    <div class="container">
      <!-- 搜索框部分 -->
      <div class="searchContainer">
        <div class="solagan">
          <span class="Shopping-online">Shopping Online</span>
        </div>
        <div class="searchbox">
          <input
            type="text"
            v-model="searchQuery"
            @input="filterKeywords"
            @keyup.enter="performSearch"
            placeholder="please input the search key"
          />
          <button @click="performSearch">Search</button>
        </div>
        <div class="keyword-area">
          <span class="keyword-label">Keywords:</span>
          <span
            v-for="(keyword, index) in allKeywords"
            :key="index"
            class="keyword-item"
            @click="selectKeyword(keyword)"
          >
            {{ keyword }}<span v-if="index < allKeywords.length - 1"> </span>
          </span>
        </div>
      </div>

      <!-- 使用与 HomeNew.vue 相同的 ProductList 展示格式，即采用 type="hot-products" -->
      <ProductList type="hot-products" @show-product="openProductModal" />

      <!-- 分页信息（如果需要） -->
      <div class="page-info">
        <span>当前页码：{{ page }}</span>
      </div>
      <div class="limit-info">
        <span>每页显示数量：{{ limit }}</span>
      </div>
      <Pagination
        :currentPage="page"
        :totalPages="totalPages"
        @page-change="handlePageChange"
      />

      <!-- 模态产品展示 -->
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
import NavBar from "../components/NavBar.vue";
import TitleBar from "../components/TitleBar.vue";
/* 修改为与 HomeNew.vue 中使用的组件保持一致 */
import ProductList from "../components/ProductList.vue";
import Pagination from "../components/Pagination.vue";
import ProductModal from "../components/ProductModal.vue";
import Footer from "../components/Footer.vue";
import { ref } from "vue";

export default {
  name: "SearchAndDisplay",
  components: {
    NavBar,
    TitleBar,
    ProductList,
    Pagination,
    ProductModal,
    Footer,
  },
  setup() {
    const searchQuery = ref("");
    const allKeywords = ref(["手机", "电脑", "平板", "相机", "耳机", "..."]);
    const filteredKeywords = ref([]);

    const filterKeywords = () => {
      if (searchQuery.value === "") {
        filteredKeywords.value = [];
      } else {
        filteredKeywords.value = allKeywords.value.filter((keyword) =>
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
      if (searchQuery.value.trim() !== "") {
        console.log(`开始搜索: ${searchQuery.value}`);
        // 如果需要，可在这里触发 ProductList 内部的数据刷新逻辑
      }
    };

    // 分页相关数据
    const page = ref(1);
    const totalPages = ref(1);
    const limit = ref(10);

    // 控制产品模态展示
    const modalProduct = ref(null);
    const openProductModal = (product) => {
      modalProduct.value = product;
    };
    const closeProductModal = () => {
      modalProduct.value = null;
    };

    const handlePageChange = (newPage) => {
      page.value = newPage;
      // 如果 ProductList 组件依赖分页数据，可以在这里通知其更新数据
    };

    return {
      searchQuery,
      allKeywords,
      filteredKeywords,
      filterKeywords,
      selectKeyword,
      performSearch,
      page,
      totalPages,
      limit,
      modalProduct,
      openProductModal,
      closeProductModal,
      handlePageChange,
    };
  },
};
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

/* 搜索框样式 */
.searchContainer {
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

/* 分页及产品列表等其他样式可依据实际需求调整 */
</style>