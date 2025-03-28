<template>
  <div class="title-bar">
    <div class="title-text">Shopping Online</div>
  </div>
</template>

<script>
export default {
  name: "TitleBar"
}
</script>

<style scoped>
.title-bar {
  position: absolute;
  left: 475px;
  top: 77px;
  width: 504px;
  height: 66px;
  opacity: 1;
  background-color: #fff; /* Entire component background is white */
  display: flex;
  align-items: center;
}
.title-text {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 59.52px;
  text-align: left;
  vertical-align: top;
  /* Apply the image as the font fill */
  background: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png) no-repeat center;
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* For browsers that don't support background-clip:text, fallback color */
  color: #000;
  width: 100%;
}
</style>