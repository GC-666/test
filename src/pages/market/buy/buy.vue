<template>
	<tm-app>
		<tm-navbar  title="求购市场">
			<template v-slot:right>
				<tm-text class="mr-20" :fontSize="22" label="求购记录" @click="gonav('pages/market/buy/buyRecord')">
				</tm-text>
			</template>
		</tm-navbar>
		<scroll-view scroll-y="true"  class="scroll-Y" @scrolltolower="lower">
			<view v-if="sellList.length>0" class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="relative" v-for="(data,index) in 10">
					<tm-sheet @click="gonav('pages/market/buy/buyMy')" :round="4" :shadow="0" :margin="[0,10]" :padding="[0,0]">
						<tm-image :round="4" :width="344" :height="344" :src="a1">
						</tm-image>
						<view class="mb-10 ml-10 mr-10">
							<tm-text :font-size="26" class="mt-5" _class="text-weight-b" label="《艺术藏品》"></tm-text>
							<tm-text :font-size="22" class="mt-5" _class="text-weight-b" label="所属系列：xxddd"></tm-text>
							<view class="flex flex-between mt-10 mb-5">
								<tm-text :font-size="22" class="" _class="text-weight-b" label="作者:浔画艺术"></tm-text>
								<view class="flex flex-center">
									<tm-text :font-size="28" class="" _class="text-weight-b" label="￥100"></tm-text>
									<tm-text :font-size="20" class="" _class="text-weight-b" label="起"></tm-text>
								</view>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
			<view v-else class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
				<tm-image :round="4" class="flex-start" :width="350" :height="350" :src="wushuju"></tm-image>
			</view>
		</scroll-view>
	</tm-app>
</template>


<script setup>
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		My
	} from "@/api/api.ts"
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	import a1 from "@/static/market/1.png"
	
	//收购列表
	const sellList = ref([{}]);
	//页面加载完成执行
	onShow(() => {
		//tabsChange();
	})
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
</style>
