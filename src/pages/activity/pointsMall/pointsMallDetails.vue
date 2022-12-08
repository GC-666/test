<template>
	<tm-app>
		<tm-navbar  title="商品详情">
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
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,20]">
			<tm-text _class="ml-20" :font-size="28" label="iPhone 14 256g 金色"></tm-text>
			<view class="flex flex-between ml-20 mr-20 mt-10 mb-10">
				<view class="flex flex-center">
					<tm-image :round="0" :width="26" :height="26" :src="jifen">
					</tm-image>
					<tm-text _class="" :color="bgColor" :font-size="24" label="666666积分"></tm-text>
				</view>
				<tm-text _class="" :font-size="24" label="剩余 : 2"></tm-text>
			</view>
		</tm-sheet>
		<view class="ma-20">
			<tm-text _class="" :font-size="32" label="商品参数"></tm-text>
			<view class="flex flex-between mt-20">
				<view class="">
					<tm-text _class="" :font-size="28" label="产品名称：小牛电动车2"></tm-text>
					<tm-text class="mt-10" :font-size="28" label="颜色：绿"></tm-text>
				</view>
				<view class="">
					<tm-text _class="" :font-size="28" label="产品编号：6468666"></tm-text>
					<tm-text class="mt-10" :font-size="28" label="出厂日期：2022.11.11"></tm-text>
				</view>
			</view>
			<view class="mt-20">
				<tm-text _class="" :font-size="32" label="商品实拍"></tm-text>
			</view>
		</view>
		<image style="width:750rpx;" mode="widthFix" :src="zuiixn" ></image>
		<view class="ma-20">
			<tm-text _class="" :font-size="32" label="兑换须知"></tm-text>
			<view class="mt-20">
				<tm-text _class="" :font-size="28" label="产品名称：小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车小牛电动车2"></tm-text>
			</view>
		</view>
		<view style="margin-top: 50rpx;" class="flex">
			<tm-sheet :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-center" style="width:375rpx;height:80rpx;color:#fff">
					<tm-text _class="" :font-size="28" label="消耗6666662积分"></tm-text>
				</view>
			</tm-sheet>
			<tm-sheet :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-center" 
					@click="gonav('pages/activity/pointsMall/pointsMallOrder?id='+1)" 
					:style="`width:375rpx;height:80rpx;background-color: ${bgColor};color:#fff`">
					<tm-text _class="text-weight-b" :font-size="28" label="立即兑换"></tm-text>
				</view>
			</tm-sheet>
			<!-- <tm-button :height="80" :round="-1" @click="composeCompose" form-type="submit" :fontSize="38" label="合成"></tm-button> -->
		</view>
	</tm-app>
</template>


<script setup>
	import jifen from "@/static/activity/pointsMall/jifen.png"
	import zuiixn from "@/static/activity/pointsMall/zuiixn.png"
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { Activity } from "@/api/api.ts"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	
	//每次加载页面执行
	onShow(() => {
		uni.$on('update',function(data){
			console.log("data",data);
		})
	})
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
