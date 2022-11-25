<template>
	<view class="" v-for="i in 200">角色{{i}}</view>

</template>


<script setup>
	import { My } from "@/api/api.ts"
	import { onMounted, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	const actions = ref([{
			icon: 'tmicon-quan',
			label: '冒险列表',

		},
		{
			icon: 'tmicon-hongbao',
			label: '一键冒险',

		},
		{
			icon: 'tmicon-hongbao',
			label: '一键领取',

		},
		{
			icon: 'tmicon-hongbao',
			label: '冒险记录',

		},
	])
</script>

<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
</style>
