<template>
	<tm-app>
		<tm-navbar title="浔画之龙">
			<template v-slot:right>
				<tm-icon v-if="acc==0 || acc==1 || acc==3" _class="mr-20" :fontSize="28" name="tmicon-question-circle"
					@click="showWin = !showWin">
				</tm-icon>
				<tm-text v-if="acc==2" :font-size="26" class=" mr-15" label="交易记录"
					@click="gonav('pages/my/role/market/transaction/transaction')">
				</tm-text>
			</template>
		</tm-navbar>
		<!-- 冒险 -->
		<take v-if="acc==0"></take>
		<!-- 抽卡 -->
		<draw v-if="acc==1"></draw>
		<!-- 市场 -->
		<market v-if="acc==2"></market>
		<!-- 英雄 -->
		<role v-if="acc==3"></role>


		<tm-overlay v-model:show="showWin" contentAnimation transprent>
			<view class="mack" @click.stop="">
				<view class="mt-n25 ml-10 mr-10"
					style="width: 640rpx;word-wrap:break-word;word-break:break-all;overflow: hidden;">
					21ddddddddddddddddddddddddddddddddd23</view>
			</view>
		</tm-overlay>
		<view class="">
			<tm-tabbar :autoSelect="false" :showSafe="showSafe" v-model:active="acc">
				<tm-tabbar-item @click="change(0)" text="冒险" icon='tmicon-cog-fill'></tm-tabbar-item>
				<tm-tabbar-item @click="change(1)" text="抽卡" icon='tmicon-cog-fill'></tm-tabbar-item>
				<tm-tabbar-item @click="change(2)" text="市场" icon='tmicon-cog-fill'></tm-tabbar-item>
				<tm-tabbar-item @click="change(3)" text="英雄" icon="tmicon-cog-fill"></tm-tabbar-item>
			</tm-tabbar>
		</view>
	</tm-app>
</template>


<script setup>
	import { My } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import role from '@/pages/my/role/role/role.vue'
	import take from '@/pages/my/role/take/take.vue'
	import draw from '@/pages/my/role/draw/draw.vue'
	import market from '@/pages/my/role/market/market.vue'
	// tabbar 下标
	const acc = ref(0)
	const showWin = ref(false)
	const bottom = ref('')
	const showSafe = ref(false)
	onBeforeMount(() => {
		// #ifdef APP-PLUS
		if (uni.getSystemInfoSync().platform == "ios") {
			showSafe.value = true
		}
		// #endif

	})
	const change = (i) => {
		acc.value = i
	}
</script>

<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}

	.mack {
		width: 660rpx;
		height: 970rpx;
		background-image: url('@/static/role/sm.png');
		background-size: 100% 100%;
	}
</style>
