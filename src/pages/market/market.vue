<template>

	<tm-app>
		
		<tm-sheet>
			<tm-text :font-size="32" label="纵向滚动"></tm-text>
			<tm-divider></tm-divider>
			<tm-text label="不支持在pc端使用.请在移动端查看效果,支持:下拉刷新,触底刷新的操作."></tm-text>
			<tm-text color="red" label="这是一个试验性的组件"></tm-text>
		</tm-sheet>
		<tm-scrolly>
			<view v-for="(item,index) in 50" :key="index" style="height: 40px;" class="px-36">
				<text>{{item}}</text>
			</view>
		</tm-scrolly>
		<tabbar :acc="1"></tabbar>
	</tm-app>
</template>

<script setup lang="ts">
	import tabbar from '@/components/tabbar.vue'
	import { onShow } from '@dcloudio/uni-app';
	onShow(() => {
		uni.hideTabBar({
			animation: false
		})
	})
</script>

<style>

</style>
