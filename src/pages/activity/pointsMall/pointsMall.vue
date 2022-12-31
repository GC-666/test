<template>
	<tm-app>
		<tm-navbar title="积分商城">
		</tm-navbar>
		<view class="head flex flex-col flex-between">
			<view class="flex flex-row-top-center ma-24">
				积分商城
			</view>
			<view class="flex flex-between" style="margin: 24rpx 76rpx;">
				<view class="">
					我的积分 : {{userIntegal}}
				</view>
				<view class="" @click="gonav('pages/activity/pointsMall/pointsMallList')" >
					兑换记录
				</view>
			</view>
		</view>
		<view class="flex" style="margin:20rpx 0rpx 0rpx 24rpx;" >
			<tm-image :round="4" :width="78" :height="44" :src="newpng">
			</tm-image>
			<view class="flex flex flex-row-bottom-start">
				<tm-text _class="text-weight-b" :font-size="26" label="最新上架"></tm-text>
			</view>
		</view>
		<view class="flex flex-around mt-5">
			<tm-sheet style="border-radius: 20rpx;"
				@click="gonav('pages/activity/pointsMall/pointsMallDetails?id='+data.id)" 
				:shadow="0" :margin="[10,10]" :padding="[10,10]" v-for="(data,index) in 3">
				<tm-image :round="0" :width="205" :height="142" :src="zuiixn">
				</tm-image>
				<view class="flex flex-center">
					<tm-text _class="" :font-size="22" label="iPhone 14 256g 金色"></tm-text>
				</view>
				<view class="flex flex-between">
					<view class="flex flex-center">
						<tm-image :round="0" :width="18" :height="18" :src="jifen">
						</tm-image>
						<tm-text _class="" :color="bgColor" :font-size="22" label="666666积分"></tm-text>
					</view>
					<tm-text _class="" :font-size="22" label="剩余 : 2"></tm-text>
				</view>
			</tm-sheet>
		</view>
		<view class="flex" style="margin:20rpx 0rpx 0rpx 24rpx;" >
			<tm-image :round="4" :width="44" :height="44" :src="remen">
			</tm-image>
			<view class="flex flex flex-row-bottom-start">
				<tm-text _class="text-weight-b" :font-size="26" label="热门兑换"></tm-text>
			</view>
		</view>
		<view class="flex flex-between flex-wrap mt-5 pl-15 pr-15">
			<tm-sheet style="border-radius: 20rpx;" :shadow="0" :margin="[0,10]" :padding="[0,0]" v-for="(data,index) in 10">
				<tm-image :round="20" :width="350" :height="380" :src="zuiixn">
				</tm-image>
				<view class="flex flex-center">
					<tm-text _class="" :font-size="28" label="iPhone 14 256g 金色"></tm-text>
				</view>
				<view class="flex flex-between ml-20 mr-20 mt-5 mb-10">
					<view class="flex flex-center">
						<tm-image :round="0" :width="26" :height="26" :src="jifen">
						</tm-image>
						<tm-text _class="" :color="bgColor" :font-size="24" label="666666积分"></tm-text>
					</view>
					<tm-text _class="" :font-size="24" label="剩余 : 2"></tm-text>
				</view>
			</tm-sheet>
		</view>
	</tm-app>
</template>

<script setup>
	import newpng from "@/static/activity/pointsMall/new.png"
	import zuiixn from "@/static/activity/pointsMall/zuiixn.png"
	import jifen from "@/static/activity/pointsMall/jifen.png"
	import remen from "@/static/activity/pointsMall/remen.png"
	import { onShow, onLoad } from '@dcloudio/uni-app';
	import { Activity } from "@/api/api.ts";
	import { onMounted, reactive, ref } from 'vue';
	//返回数据
	const userIntegal = ref(0);
	//每次加载页面执行
	onShow(() => {
		getLootFindItem();
	})
	const getLootFindItem = (e) => {
		Activity.lootFindItem({}).then(res => {
			//积分数量
			userIntegal.value = res.userIntegal;
		})
	}
	
	
</script>
<style scoped>
	.head {
		background-image: url("@/static/activity/pointsMall/head.png");
		background-size: 100% 100%;
		width: 750rpx;
		height:422rpx;
		color:#fff;
		font-size: 26rpx;
	}
</style>