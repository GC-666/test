<template>
	<tm-app>
		<tm-navbar  title="盲盒详情">
		</tm-navbar>
		<view class="flex-col 	flex-center	">
			<tm-text class="mt-14" :font-size="32" _class="text-weight-b" :label="userBoxFindItem.boxName"></tm-text>
			<view class="flex">
				<tm-text style="background-color: #FFCE92;padding:4rpx 6rpx;border-radius: 8rpx;" class="mt-14" :font-size="18" _class="text-weight-b" label="编号:"></tm-text>
				<tm-text color="#FFCE92" class="mt-14" :font-size="18" _class="text-weight-n" :label="userBoxFindItem.no"></tm-text>
			</view>
		</view>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="userBoxFindItem.boxImg">
					</tm-image>
				</view>
			</view>
		</view>
		<view style="margin-top: 100rpx;">
			<view class="flex flex-center">
				<view style="width:50%" v-if="userBoxFindItem.type==0 && userBoxFindItem.isGive==='1'">
					<tm-button color="red" @click="conversion" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="转增"></tm-button>	
				</view>
				<view style="width:50%"  v-if="userBoxFindItem.type==0 && userBoxFindItem.isLock==0">
					<tm-button @click="gonav('pages/my/collections/collectionsConsignment?id='+userBoxFindItem.id)" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="寄售"></tm-button>
				</view>
				<view style="width:50%" v-if="userBoxFindItem.type==1 || userBoxFindItem.type==2" >
					<tm-button color="#cdcdcd" @click="consignment" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="撤回"></tm-button>
				</view>
			</view>
		</view>
		<tm-modal :height="300" title="提示" okText="确认" splitBtn v-model:show="show" @ok="submit" >
			<view class="flex flex-row-center-center">
				<tm-text :font-size="26" label="确认取消寄售"></tm-text>
			</view>
		</tm-modal>
		<tm-modal :height="470" title="转增" okText="确认" splitBtn v-model:show="show2" :beforeClose="beforeClose" @ok="submit2" :close="pwd=''">
			<tm-input prefix="tmicon-search" @blur="calculation" v-model="phone" placeholder="请输入好友手机号" @search="query" searchLabel="查询" ></tm-input>
			<view class="flex">
				<tm-text class="mt-30 mb-30 ml-20" :font-size="26" :label="content"></tm-text>
			</view>
			<tm-input placeholder="请输入交易密码" v-model="pwd"></tm-input>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	
	//藏品详情
	const userBoxFindItem = ref({});
	onLoad((e)=>{
		My.userBoxFindItem({
			id:e.id
		}).then(res => {
			userBoxFindItem.value = res;
		})
	})
	//取消寄售点击
	const consignment=()=>{
		show.value=true;
	}
	//转增
	const show2 = ref(false);
	//点击转增
	const conversion=()=>{
		show2.value=true
	}
	//查询转增人
	const phone = ref("");
	const content = ref("");
	const show3=ref(false);
	const query=()=>{
		My.userNewMiniFindUserName({
			toUserPhone:phone.value
		}).then(res => {
			show3.value=true;
			content.value="好友名称:"+res.nickname;
		})
	}
	//手机号输入框改变
	const calculation=()=>{
		console.log(phone.value);
		show3.value=false;
	}
	//点击确认转增
	const submit2=()=>{
		My.userNewMiniGive({
			id: collectionDetails.value.id,
			password: pwd.value,
			toUserPhone: phone.value
		}).then(res => {
			uni.navigateBack({
				delta:1,
			})
		})
	}
	//交易密码
	const pwd = ref("");
	const beforeClose=()=>{
		if(show3.value){
			if(pwd.value!=''){
				return true;
			}else{
				uni.showToast({
					title: "未输入密码",
					icon: 'none'
				})
			}
		}else{
			uni.showToast({
				title: "未点击查询",
				icon: 'none'
			})
		}
		return false;
	}
	
	
	//寄售提示
	const show = ref(false);
	//取消寄售提交
	const submit=()=>{
		My.collectionWithdraw({
			id: collectionDetails.value.id
		}).then(res => {
			My.collectionDetails({
				id:collectionDetails.value.id
			}).then(res => {
				collectionDetails.value = res;
			})
		})
	}
	
	//海峡连
	const aa=()=>{
		// #ifdef H5
			window.location.href="https://explorer.straitchain.com/#/index"
		// #endif
		// #ifdef APP-PLUS
			plus.runtime.openURL("https://explorer.straitchain.com/#/index")
		// #endif
	}
	
</script>

<style>
	.img {
		display: flex;
		justify-content: center;
		margin-bottom: 150rpx;
		position: relative;
		top: -300rpx;
	}

	.head {
		margin-top: 320rpx;
	}
</style>
