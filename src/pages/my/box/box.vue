<template>
	<tm-app style="">
		<tm-navbar  title="盲盒" :shadow="0">
		</tm-navbar>
		<scroll-view scroll-y="true" :class="userBoxFindReportPageList.length>0?'scroll-Y':''" @scrolltolower="lower">
			<view  class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="relative" v-for="(data,index) in userBoxFindReportPageList"
					@click="gonav('pages/my/box/boxType?id='+data.boxId+'&boxName='+data.boxName)">
					<tm-sheet :round="4" :shadow="0" :margin="[0,10]" :padding="[0,0]">
						<tm-image class="round-t-4" :width="344" :height="344" :src="data.boxImg">
						</tm-image>
						<view class="pa-10">
							<tm-text _class="text-weight-b text-overflow" _style="width:320rpx;text-overflow: ellipsis;" :fontSize="28"
								:label="data.boxName">
							</tm-text>
						</view>
						<view class="flex flex-between mt-10 mb-10 pl-10 br-10">
							<view class="flex flex-center" style="background-color: #FFE6C8;border-radius: 10rpx;padding: 4rpx 10rpx;">
								<tm-text color="#999" :font-size="28" class="" :label="data.unOpenCount"></tm-text>
								<tm-text color="#999" :font-size="28" class="" label="/"></tm-text>
								<tm-text color="#999" :font-size="28" class="" :label="data.totalCount"></tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
			
		</scroll-view>
		<view v-if="userBoxFindReportPageList.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="280" :height="230" :src="wushuju"></tm-image>
		</view>
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
	
	//页面加载完成执行
	onLoad(() => {
		tabsChange();
	})
	//藏品类型列表
	const userBoxFindReportPageList = ref({});
	//配置参数
	const pageData = ref({
		page: 1,
		limit: 20
	});
	const bool = ref(true);
	// 下拉刷新
	const lower = () => {
		pageData.value.page = pageData.value.page + 1;
		if (bool.value) {
			My.userBoxFindReportPageList(pageData.value).then(res => {
				userBoxFindReportPageList.value = userBoxFindReportPageList.value.concat(res)
				if (res.length = pageData.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		}
	}
	const tabsChange = (i) => {
		pageData.value.page = 1;
		userBoxFindReportPageList.value = [];
		My.userBoxFindReportPageList(pageData.value).then(res => {
			userBoxFindReportPageList.value = res;
			if (res.length == pageData.value.limit) {
				bool.value = true;
			} else {
				bool.value = false;
			}
		})
	}
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
</style>
