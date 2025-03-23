<template>
    <div class="body">
        <div class="header">
            <div class="wrapper"> 
                 <!-- 当前所处位置 -->
                <div class="location">
                    <div class="location-style"><a href="#"></a>
                        <span @click="handlegobackHome">Home</span>
                    </div>
                </div>
            </div>
        </div> 
        <div class="Info">
             <div class="MessageBox">
                 <div class="user">
                    <div class="Touxiang">
                        <!-- 这里需要添加具体的头像替换逻辑 -->
                        <img src="../assets/test1.png" alt="">
                    </div>
                    <div class="func">
                        <!-- 这里是一些功能 -->
                        <ul>
                            <li>
                                <div class="myMessage" >Profile</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="toCart" @click="gotoCart">Cart</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="toOrders" @click="gotoOrders">My Orders</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="toPendingpayment" @click="gotoPendingpayment">Pending Payment</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="toAwaitingdeivery" @click="gotoAwaitingdeivery">Awaiting Delivery</div>
                            </li>
                        </ul>
                    </div>  
                 </div>
                 <div class="editMessage">
                        <!-- 这里可以修改信息 -->

                 </div>
             </div>
        </div>
    </div>
</template>
<script setup>
import CategoryDropdown from '@/components/CategoryDropdown.vue';
import Carts from './Carts.vue';
import Myorders from './Myorders.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router =useRouter ();

const handlegobackHome =()=>{
    router.push('/homenew'); //跳转回home
}
const gotoCart=()=>{
    router.push('./Carts');
}
const gotoOrders=()=>{
    router.push('./Orders');
}
const gotoPendingpayment=()=>{
    router.push('./'); //路由暂未设计
}
const gotoAwaitingdeivery=()=>{
    router.push('./');  //路由暂未设计
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
.header{
    height: 66px;
    opacity: 1;
    background: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png);
    background-size: cover; /* 使背景图覆盖整个元素 */
    background-repeat: no-repeat; /* 防止背景图重复 */
}
.header .wrapper{
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
    color: white; /* 设置文字颜色为白色 */
    text-decoration: none;
    font-size:22px;
}


.Info{
    margin:0 auto;
    height:800px;
    width:1440px;
    /* background-color: #fcb8ca; */
    display:flex;
    justify-content: center;

}
.MessageBox{
    margin-top: 30px;
    /* left: 115px;
    top: 120px; */
    width: 1211PX;
    height: 766px;
    opacity: 1;
    background-color: rgba(229, 229, 229, 0.3);
}


.user{
    margin-left:52px;
    margin-top:23px;
    width: 154px;
    height: 152px;
    opacity: 1;
    background: rgba(255, 255, 255, 0);
    border: 2px solid rgba(119, 167, 244, 1);
    border-radius: 50%;
}
.Touxiang{
    display: flex;
}
.Touxiang img{
    width:100%;
    height:100%;
    object-fit: cover; 
    border-radius: 50%;
}

.func{
    margin-top:43px;
    width:171px;
    height:520px;
    opacity: 1;
    border-radius: 10px;
    background: rgba(255, 255, 255, 1)
}
li{
    list-style-type: none;
    height:100px;
    display:flex;
    justify-self: center;
    align-items: center;
}
div .myMessage {
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
div .toCart{
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
div .toOrders{
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
div .toPendingpayment{
    margin-left: 28px;
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
div .toAwaitingdeivery{
    margin-left: 28px;
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);/*, #00ddff */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.editMessage{
    margin-left: 303px; 
    width: 843px;
    height: 586px;
    background-color: #fcb8ca;
}
</style>