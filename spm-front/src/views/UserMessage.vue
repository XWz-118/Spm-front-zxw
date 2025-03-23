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
                        <div class="form-item">
                            <label for="username">Username:</label>
                            <input type="text" id="username" v-model="userData.username">
                            <button @click="editUsername">Edit</button>
                        </div>
                        <div class="form-item">
                            <label for="phone">Tel.:</label>
                            <input type="text" id="phone" v-model="userData.phone">
                            <button @click="editPhone">Edit</button>
                        </div>
                        <div class="form-item">
                            <label for="email">email:</label>
                            <input type="text" id="email" v-model="userData.email">
                            <button @click="editEmail">Edit</button>
                        </div>
                        <div class="form-item">
                            <label for="password">password:</label>
                            <input type="password" id="password" v-model="userData.password">
                            <button @click="editPassword">Edit</button>
                        </div>
                 </div>

                 <!-- 收货地址 -->
                <div class="addressbox">
                    <div class="titlebox">
                        <span class="title">My Address</span>
                    </div>
                    <div v-for="(address, index) in userAddresses" :key="index" class="address-item">
                        <div class="address-content">
                            <p>{{ address.address }}</p>
                        </div>
                        <div class="address-actions">
                        <el-button type="primary" @click="editAddress(index)">Edit</el-button>
                        <el-button type="danger" @click="deleteAddress(index)">Delete</el-button>
                        </div>
                    </div>
                    <div v-if="isAddingAddress" class="add-address-form">
                    <el-input v-model="newAddress" placeholder="Enter your address"></el-input>
                    <el-button type="success" @click="addAddress">Add</el-button>
                    </div>
                    <el-button v-if="!isAddingAddress" @click="startAddingAddress">Add New Address</el-button>
                </div>
             </div>
        </div>
           <!-- 地址编辑对话框 -->
        <el-dialog v-model="isEditAddress" title="Edit Address">
        <el-input v-model="editedAddress" placeholder="Enter your address"></el-input>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="isEditAddress = false">Cancel</el-button>
            <el-button type="primary" @click="saveEditedAddress">Save</el-button>
            </span>
        </template>
        </el-dialog> 
    </div>
</template>
<script setup>
import CategoryDropdown from '@/components/CategoryDropdown.vue';
import Carts from './Carts.vue';
import Myorders from './Myorders.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElButton, ElInput, ElDialog } from 'element-plus';
//import axios from 'axios';
const router =useRouter ();

const handlegobackHome =()=>{
    router.push('/homenew'); //跳转回home
}
const gotoCart=()=>{
    router.push('./Carts');
}
const gotoOrders=()=>{
    router.push('./Myorders');
}
const gotoPendingpayment=()=>{
    router.push('./'); //路由暂未设计
}
const gotoAwaitingdeivery=()=>{
    router.push('./');  //路由暂未设计
}

const userData = ref({
    username: '',
    phone: '',
    email: '',
    password: ''
});
const editUsername = () => {

    console.log('编辑用户名');
}
const editPhone = () => {
    
    console.log('编辑电话');
}
const editEmail = () => {
    
    console.log('编辑邮箱');
}
const editPassword = () => {
    
    console.log('编辑密码');
}
//获取信息
//onMounted(() => {
//     fetchUserData();
// });
// const fetchUserData = async () => {
//     try {
//         const response = await axios.get('接口地址'); //
//         userData.value = response.data;
//         userAddresses.value=response.data.userAddresses;
//     } catch (error) {
//         console.error('获取用户数据失败:', error);
//     }
// };
// 组件挂载时调用获取数据
// 

const userAddresses = ref([
  
]);
const newAddress = ref('');
const isAddingAddress = ref(false);
const isEditAddress = ref(false);
const editedAddress = ref('');
const editedAddressIndex = ref(null);
const addAddress = () => {
  if (newAddress.value.trim()!== '') {
    userAddresses.value.push({ address: newAddress.value });
    newAddress.value = '';
    isAddingAddress.value = false;
  }
};

const deleteAddress = (index) => {
  userAddresses.value.splice(index, 1);
};

const editAddress = (index) => {
  isEditAddress.value = true;
  editedAddress.value = userAddresses.value[index].address;
  editedAddressIndex.value = index;
};

const saveEditedAddress = () => {
  if (editedAddressIndex.value!== null && editedAddress.value.trim()!== '') {
    userAddresses.value[editedAddressIndex.value].address = editedAddress.value;
    isEditAddress.value = false;
  }
};

const startAddingAddress = () => {
  isAddingAddress.value = true;
};

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

.Info{
    margin:0 auto;
    height:800px;
    width:1440px;
    display:flex;
    justify-content: center;

}
.MessageBox{
    margin-top: 30px;
    width: 1211PX;
    height: 1200px;
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
    background-image: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50px;
    display: flex; 
    flex-direction: column; 
    justify-content: space-around;
    padding: 20px;
}
.form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.form-item label {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: right;
    color:white;
    font-size:34px;
}
.form-item input {
    width: 400px; 
    height:50px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
.form-item button {
    width:100px;
    height:50px;
    padding: 5px 10px;
    margin-right: 50px;
    border: none;
    background-color: #7dbcff;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-size:35px;
}

.addressbox{
    margin-top:20px;
    margin-left:52px;
    height:400px;
    width: 1100px;
    background-image: url(https://img.js.design/assets/img/67cfdb8607c4c2e467899865.png);
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50px;
}
.titlebox {
  margin-bottom: 10px;
}
.title {
  margin-left: 20px;
  font-size: 28px;
  color: white;
}
.address-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 10px;
}
.address-content p {
  margin: 0;
}
.add-address-form {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>