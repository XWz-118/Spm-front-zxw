<template>
  <div class="pagination">
    <button 
      v-for="pageNumber in pages" 
      :key="pageNumber" 
      @click="changePage(pageNumber)"
      :disabled="pageNumber === currentPage"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      let pageList = []
      for (let i = 1; i <= this.totalPages; i++) {
        pageList.push(i)
      }
      return pageList
    }
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('page-change', pageNumber)
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
}
</style>