<template>
	<tm-app>
		<view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view>
		
		<tabbar :acc="2"></tabbar>
	</tm-app>
</template>

<script setup>
	import tabbar from '@/components/tabbar.vue'
	import { onShow } from '@dcloudio/uni-app';
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	onShow(() => {
		uni.hideTabBar({
			animation: false
		})
	})
</script>

<style>

</style>
