<template>
	<tm-app>
		<tm-navbar hideHome title="藏品详情">
		</tm-navbar>
		<view class="flex flex-row-center-center">
			<tm-image :width="500" :height="500" :src="collectionDetails.img"></tm-image>
		</view>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex flex-between pt-10 pb-10">
				<view class="">
					<tm-text :font-size="32" _class="text-weight-b" :label="collectionDetails.name"></tm-text>
					<tm-text class="mt-14" color="#999" :font-size="18" _class="text-weight-n" :label="collectionDetails.no"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-text color="#FFCE92" :font-size="18" _class="text-weight-b" label="买入价￥:"></tm-text>
					<tm-text color="#FFCE92" :font-size="36" _class="text-weight-b" :label="collectionDetails.buyprice"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="收藏者"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="collectionDetails.collector	"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="藏品哈希值"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text  :font-size="22" _class="text-weight-b text-overflow" _style="width:300rpx;text-overflow: ellipsis;" :label="collectionDetails.hash"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="创作者"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="collectionDetails.creator"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="购买时间"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="collectionDetails.date"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="海峡链"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text @click="aa" color="#07EBFE"  :font-size="22" _class="text-weight-b" label="点击跳转"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<view style="margin-top: 100rpx;">
			<tm-button @click="gonav('pages/my/collections/collectionsConsignment?id='+collectionDetails.id)" :margin="[40,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="寄售"></tm-button>
		</view>
	</tm-app>
</template>


<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	
	//藏品详情
	const collectionDetails = ref({});
	onLoad((e)=>{
		My.collectionDetails({
			id:e.id
		}).then(res => {
			collectionDetails.value = res;
		})
	})
	
	const aa=()=>{
		// #ifdef H5
			window.location.href="https://explorer.straitchain.com/#/index"
		// #endif
		// #ifdef APP-PLUS
			plus.runtime.openURL("https://explorer.straitchain.com/#/index")
		// #endif
	}
	
</script>

<style>

</style>
