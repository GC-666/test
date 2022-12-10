<template>
	<tm-app>
		<view class="cover">
			<view class="flex flex-center" style="margin-top: 50rpx;">
				<tm-image :margin="[0,0]" :width="350" :height="130" :src="drawhead"></tm-image>
			</view>
			<view class="flex flex-center" style="margin-top: 50rpx;">
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
			<view class="drawcontent">
				<view class="" style="margin-left: 50rpx;">
					<tm-text color="#F5F5AC" style="line-height: 85rpx;" _class="text-weight-b" :font-size="40" label="米利恩·夏亚"></tm-text>
				</view>
				<view class="flex flex-center" style="margin-right: 140rpx;">
					<tm-text style="line-height: 85rpx;" color="#F5F5AC" :font-size="26" label="职业: 高级法师"></tm-text>
					<tm-text style="margin-left: 50rpx;line-height: 85rpx;" color="#F5F5AC" :font-size="26" label="Lv:15"></tm-text>
				</view>
			</view>
		</view>
	</tm-app>
</template>

<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import drawhead from "@/static/role/drawhead.png"
	import drawrole from "@/static/role/drawrole.png"
	
	const percent = ref(20)
	const tabbarHeight = ref('')
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
		background-image: url("@/static/role/drawbj.png");
		background-size: 100% 100%;
		z-index: 1;
	}
</style>
