<template>
  <nav class="navbar">
    <div class="nav-item home">Home</div>
    <div class="nav-item categories">Categories</div>
    <div class="nav-item cart">Cart</div>
    <div class="nav-item orders">My Orders</div>
    <div class="nav-item seller">Seller Center</div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.navbar {
  position: absolute;
  left: 0px;
  top: -2px;
  width: 1440px;
  height: 66px;
  opacity: 1;
  background: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png),
              rgba(255, 255, 255, 1);
  background-repeat: no-repeat;
  background-size: cover;
}

/* Text requirements for each nav item */
.nav-item {
  position: absolute;
  opacity: 1;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 44.64px;
  text-align: left;
  vertical-align: top;
}

/* Home */
.home {
  left: 20px;
  top: 13px;
  width: 87px;
  height: 45px;
  color: rgba(255, 255, 255, 1);
}

/* Categories */
.categories {
  left: 135px;
  top: 13px;
  width: 216px;
  height: 45px;
  color: rgba(255, 255, 255, 1);
}

/* Cart */
.cart {
  left: 379px;
  top: 13px;
  width: 87px;
  height: 45px;
  
  color: rgba(255, 255, 255, 1);
}

/* My Orders */
.orders {
  left: 512px;
  top: 13px;
  width: 182px;
  height: 44px;
  color: rgba(255, 255, 255, 1);
}

/* Seller Center */
.seller {
  left: 722px;
  top: 12px;
  width: 269px;
  height: 45px;
  color: rgba(255, 255, 255, 1);
}
</style>