<template>
	<tm-app>
		<tm-navbar  title="藏品详情">
		</tm-navbar>
		<view class="flex flex-row-center-center">
			<tm-image :width="500" :height="500" :src="collectionDetails.img"></tm-image>
		</view>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex flex-between pt-10 pb-10">
				<view class="">
					<tm-text :font-size="32" _class="text-weight-b" :label="collectionDetails.name"></tm-text>
					<tm-text class="mt-14" color="#999" :font-size="18" _class="text-weight-n" :label="collectionDetails.no"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-text color="#FFCE92" :font-size="18" _class="text-weight-b" label="买入价￥:"></tm-text>
					<tm-text color="#FFCE92" :font-size="36" _class="text-weight-b" :label="collectionDetails.buyprice"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="收藏者"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="collectionDetails.collector	"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="藏品哈希值"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text  :font-size="22" _class="text-weight-b text-overflow" _style="width:300rpx;text-overflow: ellipsis;" :label="collectionDetails.hash"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="创作者"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="collectionDetails.creator"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="购买时间"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="collectionDetails.date"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="海峡链"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text @click="aa" color="#07EBFE"  :font-size="22" _class="text-weight-b" label="点击跳转"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<view style="margin-top: 100rpx;">
			<view class="flex flex-center">
				<view style="width:100%" v-if="collectionDetails.type==0 && collectionDetails.isGive=='1'">
					<tm-button color="#12D6DF" @click="conversion" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="转增"></tm-button>	
				</view>
				<view style="width:100%"  v-if="collectionDetails.type==0 && collectionDetails.isLock==0">
					<tm-button color="#3b66f5" @click="gonav('pages/my/collections/collectionsConsignment?id='+collectionDetails.id)" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="寄售"></tm-button>
				</view>
				<view style="width:100%" v-if="collectionDetails.type==1 || collectionDetails.type==2" >
					<tm-button color="#808080" @click="consignment" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="撤回"></tm-button>
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
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	
	//藏品详情
	const collectionDetails = ref({});
	//配置信息
	const id = ref("");
	onLoad((e)=>{
		id.value=e.id
	})
	onShow((e)=>{
		My.userBoxFindItem({
			id:id.value
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

</style>
