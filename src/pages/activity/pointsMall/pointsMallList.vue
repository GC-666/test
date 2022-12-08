<template>
	<tm-app>
		<tm-navbar  title="兑换记录">
		</tm-navbar>
		<tm-sheet :round="5" :shadow="0"  :margin="[20,10]" :padding="[20,20]">
			<view class="flex flex-between">
				<tm-text class=" " :font-size="26" label="小牛NIU山翠色"></tm-text>
				<tm-text v-if="false" color="red" :font-size="26" label="待发货"></tm-text>
				<tm-text v-else :color="bgColor" :font-size="26" label="已发货"></tm-text>
			</view>
			<view class="flex flex-between mt-10">
				<tm-text class=" " :font-size="26" label="小牛NIU色"></tm-text>
				<tm-text class=" " :font-size="26" label="666666积分"></tm-text>
			</view>
			<tm-text class=" mt-10" :font-size="26" label="颜色：绿"></tm-text>
		</tm-sheet>
	</tm-app>
</template>

<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { Activity } from "@/api/api.ts"
</script>

<style>
</style>
