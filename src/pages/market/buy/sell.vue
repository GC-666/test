<template>
	<tm-app style="">
		<tm-navbar  title="需求市场">
		</tm-navbar>
		<scroll-view scroll-y="true"  class="scroll-Y" @scrolltolower="lower">
			<view v-if="sellList.length>0" class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="relative" v-for="(data,index) in 10">
					<tm-sheet @click="gonav('pages/market/buy/sellMy')" :round="4" :shadow="0" :margin="[0,10]" :padding="[0,0]">
						<view class="mb-10 ml-10" style="">
							<tm-text :font-size="28" class="mt-7" _class="text-weight-b" label="发布者：藏家:Xaadfwe"></tm-text>
						</view>
						<tm-image :round="4" :width="344" :height="344" :src="a1">
						</tm-image>
						<view class="mb-10 ml-10" style="">
							<tm-text :font-size="26" class="mt-5" _class="text-weight-b" label="《艺术藏品》"></tm-text>
							<tm-text :font-size="22" class="mt-5" _class="text-weight-b" label="所属系列：xxddd"></tm-text>
							<tm-text :font-size="22" class="mt-5" _class="text-weight-b" label="出价￥199"></tm-text>
							<tm-text color="#808080" :font-size="18" class="mt-7" _class="text-weight-b" label="发布日期：2022-11-25"></tm-text>
						</view>
					</tm-sheet>
				</view>
			</view>
			<view v-else class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
				<tm-image :round="4" class="flex-start" :width="280" :height="230" :src="wushuju"></tm-image>
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
