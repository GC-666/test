<template>
	<tm-app style="">
		<tm-navbar  title="盲盒">
		</tm-navbar>
		<scroll-view scroll-y="true" :style="`max-height: ${hh}px;`" @scrolltolower="lower">
			<view class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="relative" v-for="(data,index) in userBoxFindReportPageList"
					@click="gonav('pages/my/box/boxType?id='+data.boxId+'&boxName='+data.boxName)">
					<tm-sheet :shadow="0" :margin="[0,20]" :padding="[0,0]">
						<tm-image :width="344" :height="344" :src="data.boxImg">
						</tm-image>
						<view class="" style="margin: 0rpx 20rpx;">
							<tm-text :font-size="28" _class="text-weight-b" :label="data.boxName"></tm-text>
						</view>
						<view class="flex flex-between" style="margin: 10rpx 20rpx;">
							<view class="flex flex-center" style="background-color: #FFE6C8;border-radius: 10rpx;padding: 4rpx 10rpx;">
								<tm-text color="#999" :font-size="26" class="" :label="data.unOpenCount"></tm-text>
								<tm-text color="#999" :font-size="26" class="" label="/"></tm-text>
								<tm-text color="#999" :font-size="26" class="" :label="data.totalCount"></tm-text>
							</view>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
	</tm-app>
</template>


<script setup>
	const { screenWidth, screenHeight, windowWidth, windowHeight, statusBarHeight, safeArea, windowTop } = uni
		.getWindowInfo()
	const { height, width, top } = uni.$tm.u.getWindow()
	const hh = ref("");
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

	onLoad((e) => {
		// #ifdef APP-PLUS
		hh.value = height - 44 - 80 + 6
		// #endif
		// #ifdef H5
		if (windowTop > 0) { //0		44
			hh.value = height - windowTop
		} else {
			hh.value = height - 80 - 6
		}
		// #endif
	})
	
	//页面加载完成执行
	onMounted(() => {
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

<style>

</style>
