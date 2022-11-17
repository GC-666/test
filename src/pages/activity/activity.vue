<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<tm-sheet :margin="[0,0]" :padding="[0,statusBarHeight/2]">
		</tm-sheet>
		<tm-sheet :margin="[0,0]">
			<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center" :list="tabsTitle"
				:itemHeight="30" :itemWidth="300" :width="700" default-name="1">
			</tm-tabs>
		</tm-sheet>
		<scroll-view class="aaas" scroll-y="true">
			<view class="flex flex-wrap" style="">
				<view class="relative" v-for="(data,index) in composeFindList" style="width: 710rpx;">
					<tm-sheet :shadow="0" :margin="[0,20]" :padding="[20,20]">
						<view class="flex flex-row-center-between" style="">
							<view class="flex" style="">
								<tm-image :width="160" :height="160" :src="data.img">
								</tm-image>
								<view class="flex flex-col flex-around ml-20">
									<tm-text :font-size="26" _class="text-weight-b" :label="data.name">
									</tm-text>
									<view class="flex">
										<view style="background-color: #FFCE92; padding: 4rpx 8rpx;border-radius: 20rpx 0rpx 0rpx 20rpx;">
											<tm-text  color="#1A1A1A" :font-size="18" :label="`限量${data.limitNumber}`">
											</tm-text>
										</view>
										<view style="background-color: #323435; padding: 4rpx 8rpx;border-radius: 0rpx 20rpx 20rpx 0rpx;">
											<tm-text  color="#FFCE92" :font-size="18" :label="`剩余${data.limitNumber-data.useFalseNumber}`">
											</tm-text>
										</view>
									</view>
									<tm-text color="#A6A6A6" :font-size="18" :label="DateUtils.formatDateTime(data.startTime)">
									</tm-text>
								</view>
							</view>
							<view class="flex" style="">
								<tm-image v-if="data.status=='1'" :width="160" :height="160" :src="weikaishi"></tm-image>
								<tm-image v-if="data.status=='2'" :width="160" :height="160" :src="jinxingzhong"></tm-image>
								<tm-image v-if="data.status=='3'" :width="160" :height="160" :src="yijieshu"></tm-image>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
		
	</tm-app>
</template>

<script setup>
	import weikaishi from "@/static/activity/weikaishi.png"
	import jinxingzhong from "@/static/activity/jinxingzhong.png"
	import yijieshu from "@/static/activity/yijieshu.png"
	import {
		onShow,
		onLoad,
	} from '@dcloudio/uni-app';
	import {
		Activity
	} from "@/api/api.ts";
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	const tabsTitle = ref([{
			key: "1",
			title: "合成"
		},
		{
			key: "2",
			title: "活动"
		}
	]);
	//合成列表
	const composeFindList = ref({});
	//页面加载完成执行
	onShow(() => {
		tabsChange();
	})
	//类型下标
	const index = ref(1);
	const tabsChange = (i) => {
		index.value = i;
		composeFindList.value = [];
		Activity.composeFindList().then(res => {
			composeFindList.value = res;
		})
	}
</script>
<style>
.aaas{
	height: calc(100vh - 82rpx - 100rpx);
}
</style>
