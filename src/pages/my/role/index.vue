<template>

	<tm-app>
		<tm-navbar title="浔画打工">
			<template v-slot:right>
				<tm-icon  :fontSize="28" name="tmicon-clock"></tm-icon>
			</template>
		</tm-navbar>
		<view class="" v-show="acc==0">
			<take></take>
		</view>
		<view class="" v-show="acc==1">
			<draw></draw>
		</view>
		<view class="" v-show="acc==2">
			<role></role>
		</view>
		<view class="">
			<tm-tabbar :autoSelect="false" v-model:active="acc">
				<tm-tabbar-item @click="change(0)" text="冒险" icon='tmicon-cog-fill'></tm-tabbar-item>
				<tm-tabbar-item @click="change(1)" text="抽卡" icon='tmicon-cog-fill'></tm-tabbar-item>
				<tm-tabbar-item @click="change(2)" text="角色" icon="tmicon-cog-fill"></tm-tabbar-item>
			</tm-tabbar>
		</view>
	</tm-app>
</template>


<script setup>
	import { My } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import role from '@/pages/my/role/role.vue'
	import take from '@/pages/my/role/take.vue'
	import draw from '@/pages/my/role/draw.vue'
	// tabbar 下标
	const acc = ref(0)
	const bottom = ref('')
	onBeforeMount(() => {
		if (uni.getSystemInfoSync().platform == "ios") {
			bottom.value = '90px'
		}
		if (uni.getSystemInfoSync().platform == "android") {
			bottom.value = '75px'
		}
	})
	const change = (i) => {
		acc.value = i
	}
</script>

<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
</style>
