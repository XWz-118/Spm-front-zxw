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
        <div class="searchContainer">
                   <div class="solagan">
                          <span class="Shopping-online">My Orders</span>
                    </div>
               </div>      
        <div class="Info">
              
             <div class="MessageBox">
                
                 <div class="user">  
                    <div class="func">
                        <!-- 这里是一些功能 -->
                        <ul>
                            <li>
                                <div class="PendingPayment" @click="currentTab = components.payment">Pending Payment</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="PendingShipment }" @click=" currentTab = components.shipment">Pending Shipment</div> 
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="PendingReceipt" @click=" currentTab = components.receipt">Pending Receipt</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="toPendingpayment" @click="gotoPendingpayment">Pending Reviews</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="Refund" @click="gotoAwaitingdeivery">Refund</div>
                            </li>
                            <hr width='171px' size="1px" color="pink">
                            <li>
                                <div class="After-salesService" @click="gotoAwaitingdeivery">After-sales Service</div>
                            </li>
                        </ul>
                    </div>  
                 </div>
                 <div class="editMessage">
                    <component :is="currentTab"/>
                 </div>
                </div>  
        </div>
    </div>
</template>

<script setup>
import CategoryDropdown from '@/components/CategoryDropdown.vue';
import Carts from './Carts.vue';
import Myorders from './Myorders.vue';
import { ref ,shallowRef} from 'vue';
import { useRouter } from 'vue-router';
import { ElButton, ElInput, ElDialog } from 'element-plus';
import payment from '@/components/payment.vue';
import shipment from '@/components/shipment.vue';
import receipt from '@/components/receipt.vue';
const currentTab = shallowRef(payment)
const components = {
    payment,
    shipment,
    receipt
}



//import axios from 'axios';
const router =useRouter ();


const handlegobackHome =()=>{
    router.push('/homenew'); //跳转回home
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
    color: white; 
    text-decoration: none;
    font-size:22px;
}
.searchContainer{
height: 70px;
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
.Info{
    margin:0 auto;
    height:800px;
    width:1440px;
    display:flex;
    justify-content: center;

}
.MessageBox {
  position: relative;      /* 关键：为绝对定位的子元素提供参照 */
  margin-top: 60px;
  margin-bottom: 30px;
  width: 1211px;
  height: 700px;         /* 保持足够容纳内容 */
  background-color: rgba(229, 229, 229, 0.3);
}

.user{
    margin-left:52px;
    margin-top:23px;
    width: 154px;
    height: 152px;
    opacity: 1;
    background: rgba(255, 255, 255, 0);
    
}


.func{
    margin-top:43px;
    width:171px;
    height: 624px;
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
div .PendingPayment {
    margin-left: 28px;
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
div .PendingShipment{
    margin-left: 28px;
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
div .PendingReceipt{
    margin-left: 28px;
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
div .Refund{
    
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);/*, #00ddff */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
div .After-salesService{
    padding-top: 20px;
    margin-left: 20px;
    font-size: 28px;
    background: linear-gradient(to right, #fcb8ca, #b3faec);/*, #00ddff */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.editMessage {
  position: absolute;      /* 改为绝对定位 */
  left: 303px;            /* 替代原来的margin-left */
  top: 43px;              /* 与.user的margin-top相同 */
  width: 843px;
  height: 624px;          /* 与.func高度一致 */
  background-image: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  overflow: auto;
  min-height: 0;
}
.PendingPayment.active,
.PendingShipment.active,
.PendingReceipt.active,
.toPendingpayment.active,
.Refund.active,
.After-salesService.active {
  background: #ff6b6b !important;
  -webkit-text-fill-color: white !important;
  background-clip: border-box !important;
  border-radius: 8px;
  padding: 5px 10px;
}
</style>