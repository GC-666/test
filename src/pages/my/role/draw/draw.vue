<template>
	<view class="bg">
		<view class="main">
		</view>
		<tm-sheet :shadow="0" :round="4" :margin="[20,20]" :padding="[0,0]">
			<view class="" style="margin: 0rpx auto;">
				<view class="flex flex-row-center-start">
					<tm-image :round="4" :margin="[0,20]" :width="34" :height="24" :src="express"></tm-image>
					<tm-text :font-size="20" class="ml-10" label="浔画快递"></tm-text>
				</view>
				<tm-image :round="4" :margin="[0,0]" :width="670" :height="706" :src="drawCardCard">
				</tm-image>
				<view class="flex flex-col flex-center">
					<tm-image @click="luckDraw" :round="4" :margin="[0,20]" :width="382" :height="66" :src="drawCard"></tm-image>
					<tm-text :font-size="20" class="ml-10 mb-20" label="每次抽卡时须消耗一张***卡"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<view class="chouka ml-20" style="padding: 73rpx 0rpx;">
			<view class="" style="overflow: auto;height: 250rpx;margin-left: 30rpx;">
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
				<tm-text :font-size="20" class="ma-10" label="每次抽卡时须消耗一张***卡"></tm-text>
			</view>
		</view>
		<view :style="`height: calc(${tabbarHeight}rpx);`">
			
		</view>
	</view>
	
	<tm-overlay v-model:show="show" :overlayClick="true">
		<view class="cover">
			<view class="flex flex-center" style="margin-top: 50rpx;">
				<tm-image :margin="[0,0]" :width="350" :height="130" :src="drawhead"></tm-image>
			</view>
			<view class="flex flex-center">
				<tm-image :margin="[0,0]" :width="629" :height="858" :src="drawrole"></tm-image>
			</view>
			<view class="drawtitle flex flex-col flex-between">
				<view class="" style="margin-left: 50rpx;">
					<tm-text color="#F5F5AC" style="line-height: 85rpx;" _class="text-weight-b" :font-size="40" label="米利恩·夏亚"></tm-text>
				</view>
				<view class="flex flex-center" style="margin-right: 140rpx;">
					<tm-text style="line-height: 85rpx;" color="#F5F5AC" :font-size="26" label="职业: 高级法师"></tm-text>
					<tm-text style="margin-left: 50rpx;line-height: 85rpx;" color="#F5F5AC" :font-size="26" label="Lv:15"></tm-text>
				</view>
			</view>
			<view class=" mt-n10 mb-n10">
				<view class="drawcontent flex flex-around flex-wrap">
					<view class="flex flex-col flex-center" style="width:25%" v-for="(data,index) in 8">
						<tm-text color="#fff" :font-size="20" label="生命值"></tm-text>
						<tm-text color="#fff" :font-size="20" label="1000"></tm-text>
					</view>
				</view>
			</view>
		</view>
	</tm-overlay>
</template>

<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import yjsj from "@/static/role/yjsj.png"
	import drawCardCard from "@/static/role/drawCardCard.png"
	import drawCard from "@/static/role/drawCard.png"
	import express from "@/static/role/express.png"
	import drawhead from "@/static/role/drawhead.png"
	import drawrole from "@/static/role/drawrole.png"
	
	const percent = ref(20)
	const tabbarHeight = ref('')
	const show = ref(false);
	const aaa = ref(uni.getWindowInfo().windowHeight*2);
	
	const luckDraw = () => {
		show.value=true;
	}
	onBeforeMount(() => {
		// #ifdef APP-PLUS
		if (uni.getSystemInfoSync().platform == "android") {
			tabbarHeight.value = '110'
		} else if (uni.getSystemInfoSync().platform == "ios") {
			tabbarHeight.value = '125'
		}
		// #endif
		// #ifdef H5
		tabbarHeight.value = '110'
		// #endif
	
	})
</script>

<style scoped>
	.drawtitle{
		background-image: url("@/static/role/drawtitle.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 150rpx;
		margin: 0 auto;
	}
	.drawcontent{
		background-image: url("@/static/role/drawcontent.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 150rpx;
		margin: 0 auto;
	}
	.cover {
		width: 100%;
		min-height: 100%;
		background-image: url("@/static/role/drawbj.png");
		background-size: 100% 100%;
		z-index: 1;
		overflow: auto;
	}
	.chouka {
		background-image: url("@/static/role/drawCardCardExplain.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 250rpx;
	}
	.bg {
		width: 100%;
		height: 100%;
		background-image: url('@/static/role/detailsBg.png');
		background-size: 100% 100%;
		overflow: hidden;
	}
</style>
