<template>

	<tm-app>
		<tm-sheet :margin="[0,0]" :padding="[0,statusBarHeight/2]">
		</tm-sheet>
		<tm-sheet _class="mt-20 ml-20 mr-20" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
			<tm-input outlined prefix="tmicon-search" placeholder="请输入名称" placeholderStyle="text-align: center">
			</tm-input>
		</tm-sheet>
		<tm-sheet :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
			<view class="flex flex-around">
				这里是tabs
			</view>
		</tm-sheet>
		<scroll-view scroll-y="true" :style="`height: calc(100vh - 82rpx - 100rpx - 88rpx - ${statusBarHeight}rpx)`" >
			<view class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view v-for="(data,index) in 20"
					@click="gonav('pages/market/shop/shop?id='+data.id+'&name='+data.name)">
					<tm-sheet :shadow="0" :round="4" :margin="[0,20]" :padding="[0,0]">
						<tm-image :width="344" :height="344" :src="data.img">
						</tm-image>
						<view class="mt-20">
							<tm-text :font-size="28" _class="text-weight-b" :label="data.name"></tm-text>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
	</tm-app>
</template>
<script setup>
	import { onShow } from '@dcloudio/uni-app';
	import { Market } from "@/api/api.ts"
	import { onMounted, ref } from 'vue';
	const list = ref([])
	onMounted(() => {
		params.value.isRecommend = 1
		findMarketList()
	})
	const findMarketList = () => {
		Market.findMarketList(params.value).then(res => {
			list.value = res
		})
	}
	const params = ref({
		page: 1,
		limit: 20,
		type: 1,
		name: '',
		classId: '',
		isRecommend: 0
	})
	onShow(() => {})
</script>

<style >
	.active1 {
		font-size: 38rpx;
		color: red;
	}
	
</style>
