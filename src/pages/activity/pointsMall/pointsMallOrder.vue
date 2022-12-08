<template>
	<tm-app>
		<tm-navbar  title="确认订单">
		</tm-navbar>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="zuiixn">
					</tm-image>
				</view>
			</view>
		</view>
		<tm-sheet :shadow="0" :margin="[20,10]" :padding="[20,20]">
			<tm-text class="ml-20 mt-15" :font-size="28" label="小牛NIU 电动车 千山翠色 X 1"></tm-text>
			<tm-text class="ml-20 mt-10" :font-size="24" label="666666消耗：660000积分"></tm-text>
			<tm-text class="ml-20 mt-10" :font-size="24" label="颜色：绿"></tm-text>
			<tm-text class="ml-20 mt-10" :font-size="24" label="数量：1"></tm-text>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,10]" :padding="[20,20]">
			<view class="">
				<view class="flex flex-between">
					<tm-text class="ml-20 mt-15" :font-size="24" :label="`收货人:${DefaultAddress.consignee}`"></tm-text>
					<tm-text @click="gonav('pages/my/set/address/address?type=1')" :color="bgColor"
						 class="ml-20 mt-10" :font-size="30" label="选择其他地址">
					</tm-text>
				</view>
				<tm-text class="ml-20 mt-10" :font-size="24" :label="`联系电话:${DefaultAddress.phoneNum}`"></tm-text>
				<tm-text class="ml-20 mt-10" :font-size="24" :label="`地区:${DefaultAddress.area}`"></tm-text>
				<tm-text class="ml-20 mt-10" :font-size="24" :label="`详细地址:${DefaultAddress.detailAddress}`"></tm-text>
			</view>
		</tm-sheet>
		<view style="margin-top: 100rpx;">
			<tm-button @click="show = true" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="立即兑换"></tm-button>
		</view>
		<tm-modal :height="330" title="提示" splitBtn okText="确认" v-model:show="show" :beforeClose="beforeClose"
			@ok="submit" :close="pwd=''">
			<tm-input placeholder="请输入交易密码" v-model="pwd"></tm-input>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	import jifen from "@/static/activity/pointsMall/jifen.png"
	import zuiixn from "@/static/activity/pointsMall/zuiixn.png"
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { Activity,My } from "@/api/api.ts"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	//用户地址
	const DefaultAddress = ref({});
	
	//每次加载页面执行
	onShow(() => {
		//获取子调用返回的地址ID
		uni.$on('id',function(id){
			console.log("id",id);
			My.getUserAddressById({
				id:id
			}).then(res => {
				DefaultAddress.value = res
			})
			return;
		})
		My.getDefaultAddress().then(res => {
			DefaultAddress.value = res
		})
	})
	//寄售提示
	const show = ref(false);
	//交易密码
	const pwd = ref("");
	//兑换提交
	const submit = () => {
		uni.showToast({
			title: "兑换成功",
			icon: 'none'
		})
		show.value = false;
	}
	const beforeClose = () => {
		if (pwd.value != '') {
			return true;
		} else {
			uni.showToast({
				title: "未输入密码",
				icon: 'none'
			})
			return false;
		}
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
