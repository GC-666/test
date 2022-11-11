<template>
	<tm-app>
		<tm-navbar hideHome :title="config.collName">
		</tm-navbar>
		
		<scroll-view scroll-y="true" style="height: calc(100vh - 88rpx);" @scrolltolower="lower">
			<view class="" v-for="(data,index) in collectionShow">
				<tm-sheet :shadow="0" :margin="[20,20]" :padding="[10,10]">
					<view class="" style="margin: 0rpx 10rpx;">
						<tm-text :font-size="32" _class="text-weight-b" :label="data.name"></tm-text>
					</view>
					<view class="flex flex-between" style="margin: 0rpx 10rpx;padding: 0rpx 0rpx 10rpx 0rpx">
						<tm-text color="#999" :font-size="18" class="mt-10" :label="data.no"></tm-text>
						<view class="flex">
							<!-- <tm-text color="#999" :font-size="22" _class="text-weight-n" label="买入价"></tm-text> -->
							<tm-text color="#999" :font-size="22" _class="text-weight-b" :label="data.price">
							</tm-text>
						</view>
					</view>
				</tm-sheet>
			</view>
		</scroll-view>
	</tm-app>
</template>


<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	
	const config=ref({});
	//藏品类型详情
	const collectionShow = ref({});
	onLoad((e)=>{
		config.value=e;
		My.collectionShow({
			collId:config.value.id,
			page:1,
			limit:10,
			type:1
		}).then(res => {
			collectionShow.value = res
		})
	})
	
	
</script>

<style>

</style>
