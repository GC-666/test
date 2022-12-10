<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<tm-sheet :margin="[0,0]" :padding="[0,statusBarHeight]">
		</tm-sheet>
		<tm-sheet :margin="[0,0]">
			<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center" :list="tabsTitle"
				:itemHeight="30" :itemWidth="300" :width="700" :default-name="index">
			</tm-tabs>
		</tm-sheet>
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower"
			v-if="composeFindList.length>0 && index==1">
			<view class="flex flex-wrap flex-center" style="">
				<view class="relative" v-for="(data,index) in composeFindList"
					@click="gonav('pages/activity/syn/synDetails?id='+data.id)" style="width: 710rpx;">
					<tm-sheet :round="4" :shadow="0" :margin="[0,10]" :padding="[20,20]">
						<view class="flex flex-row-center-between" style="">
							<view class="flex" style="">
								<tm-image :round="4" :width="160" :height="160" :src="data.img">
								</tm-image>
								<view class="flex flex-col flex-around ml-20">
									<tm-text :font-size="30" _class="text-overflow text-weight-b"
										_style="width: 330rpx;text-overflow: ellipsis;" :label="data.name">
									</tm-text>
									<view class="flex">
										<view
											style="background-color: #FFCE92; padding: 4rpx 8rpx;border-radius: 20rpx 0rpx 0rpx 20rpx;">
											<tm-text color="#1A1A1A" :font-size="22" :label="`限量${data.limitNumber}`">
											</tm-text>
										</view>
										<view
											style="background-color: #323435; padding: 4rpx 8rpx;border-radius: 0rpx 20rpx 20rpx 0rpx;">
											<tm-text color="#FFCE92" :font-size="22"
												:label="`剩余${data.limitNumber-data.useFalseNumber}`">
											</tm-text>
										</view>
									</view>
									<tm-text color="#A6A6A6" :font-size="22"
										:label="DateUtils.formatDateTime(data.startTime)">
									</tm-text>
								</view>
							</view>
							<view class="flex" style="">
								<tm-image v-if="data.status=='1'" :width="160" :height="160" :src="weikaishi">
								</tm-image>
								<tm-image v-if="data.status=='2'" :width="160" :height="160" :src="jinxingzhong">
								</tm-image>
								<tm-image v-if="data.status=='3'" :width="160" :height="160" :src="yijieshu"></tm-image>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
		<view v-if="composeFindList.length<=0 && index==1" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view>
		<view v-if="index==2">
			<tm-image @click="gonav('pages/activity/loot/loot')" class="mb-10" :width="750" :height="350" :src="jfdb">
			</tm-image>
			<tm-image @click="gonav('pages/activity/pointsMall/pointsMall2')"  class="mb-10" :width="750" :height="350" :src="jfdh"></tm-image>
			<!-- <tm-image :width="750" :height="350" :src="jfsc"></tm-image> -->
			<tm-image @click="gonav('pages/activity/pointsMall/pointsMall2')" :width="750" :height="350" :src="jfsc"></tm-image>
		</view>
	</tm-app>
</template>

<script setup>
	import weikaishi from "@/static/activity/weikaishi.png"
	import jinxingzhong from "@/static/activity/jinxingzhong.png"
	import yijieshu from "@/static/activity/yijieshu.png"
	import jfdb from "@/static/activity/jfdb.png"
	import jfdh from "@/static/activity/jfdh.png"
	import jfsc from "@/static/activity/jfsc.png"
	import { onShow, onLoad } from '@dcloudio/uni-app';
	import { Activity } from "@/api/api.ts";
	import { onMounted, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
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

	})
	//类型下标
	const index = ref(1);
	const tabsChange = (i) => {
		if (i == 1) {
			Activity.composeFindList(params.value).then(res => {
				composeFindList.value = res;
			})
		}
		index.value = i;
	}

	const composeFindListBool = ref(false);
	const params = ref({
		page: 1,
		limit: 10,
	})
	onMounted(() => {
		params.value.page = 1;
		composeFindList.value = [];
		tabsChange(index.value);
	})
	const lower = () => {
		if (composeFindListBool.value) {
			params.value.page += 1
			Activity.composeFindList(params.value).then(res => {
				if (res.length === params.value.limit) {
					composeFindListBool.value = true;
				} else {
					composeFindListBool.value = false;
				}
				composeFindList.value = composeFindList.value.concat(res)
			})
		}
	}
</script>
<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 82rpx - var(--window-bottom));
	}
</style>
